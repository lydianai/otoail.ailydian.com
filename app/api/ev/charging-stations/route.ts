import { NextRequest, NextResponse } from 'next/server';

interface ChargingStation {
  ID: number;
  UUID: string;
  AddressInfo: {
    Title: string;
    AddressLine1?: string;
    Town?: string;
    StateOrProvince?: string;
    Postcode?: string;
    CountryID: number;
    Latitude: number;
    Longitude: number;
    Distance?: number;
    DistanceUnit?: number;
  };
  Connections: Array<{
    ID: number;
    ConnectionTypeID: number;
    ConnectionType?: {
      Title: string;
      FormalName?: string;
    };
    Level?: {
      Title: string;
      IsFastChargeCapable: boolean;
    };
    PowerKW?: number;
    CurrentTypeID?: number;
    Quantity?: number;
  }>;
  NumberOfPoints?: number;
  StatusType?: {
    IsOperational: boolean;
    Title: string;
  };
  OperatorInfo?: {
    Title: string;
    WebsiteURL?: string;
  };
  UsageType?: {
    Title: string;
  };
  DateLastStatusUpdate?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const distance = searchParams.get('distance') || '50'; // km
    const maxResults = searchParams.get('maxResults') || '100';
    const vehicleBrand = searchParams.get('vehicleBrand');
    const connectionType = searchParams.get('connectionType');
    const fastChargeOnly = searchParams.get('fastCharge') === 'true';

    // OpenChargeMap API endpoint for Turkey
    let apiUrl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=TR&maxresults=${maxResults}&compact=false&verbose=false`;

    // Add location-based filtering if coordinates provided
    if (lat && lon) {
      apiUrl += `&latitude=${lat}&longitude=${lon}&distance=${distance}&distanceunit=KM`;
    }

    console.log('[EV Charging API] Fetching from:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`OpenChargeMap API error: ${response.status}`);
    }

    let stations: ChargingStation[] = await response.json();

    // Filter by vehicle brand if specified
    if (vehicleBrand) {
      stations = filterByVehicleBrand(stations, vehicleBrand);
    }

    // Filter by connection type if specified
    if (connectionType) {
      stations = stations.filter(station =>
        station.Connections?.some(conn =>
          conn.ConnectionType?.Title?.toLowerCase().includes(connectionType.toLowerCase())
        )
      );
    }

    // Filter fast charge only
    if (fastChargeOnly) {
      stations = stations.filter(station =>
        station.Connections?.some(conn => conn.Level?.IsFastChargeCapable)
      );
    }

    // Transform data for frontend
    const transformedStations = stations.map(station => ({
      id: station.ID,
      uuid: station.UUID,
      name: station.AddressInfo.Title,
      address: {
        line1: station.AddressInfo.AddressLine1 || '',
        town: station.AddressInfo.Town || '',
        province: station.AddressInfo.StateOrProvince || '',
        postcode: station.AddressInfo.Postcode || '',
        latitude: station.AddressInfo.Latitude,
        longitude: station.AddressInfo.Longitude,
        distance: station.AddressInfo.Distance,
      },
      connections: station.Connections?.map(conn => ({
        id: conn.ID,
        type: conn.ConnectionType?.Title || 'Unknown',
        formalName: conn.ConnectionType?.FormalName,
        powerKW: conn.PowerKW,
        isFastCharge: conn.Level?.IsFastChargeCapable || false,
        level: conn.Level?.Title,
        quantity: conn.Quantity || 1,
      })) || [],
      numberOfPoints: station.NumberOfPoints || station.Connections?.length || 0,
      isOperational: station.StatusType?.IsOperational ?? true,
      status: station.StatusType?.Title || 'Unknown',
      operator: {
        name: station.OperatorInfo?.Title || 'Unknown',
        website: station.OperatorInfo?.WebsiteURL,
      },
      usageType: station.UsageType?.Title || 'Public',
      lastUpdate: station.DateLastStatusUpdate,
    }));

    // Sort by distance if location provided
    if (lat && lon) {
      transformedStations.sort((a, b) =>
        (a.address.distance || Infinity) - (b.address.distance || Infinity)
      );
    }

    return NextResponse.json({
      success: true,
      count: transformedStations.length,
      stations: transformedStations,
      filters: {
        location: lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null,
        distance: parseInt(distance),
        vehicleBrand,
        connectionType,
        fastChargeOnly,
      }
    });

  } catch (error) {
    console.error('[EV Charging API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch charging stations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Filter stations by vehicle brand compatibility
function filterByVehicleBrand(stations: ChargingStation[], brand: string): ChargingStation[] {
  const brandLower = brand.toLowerCase();

  // Brand-specific connector preferences
  const brandConnectors: Record<string, string[]> = {
    'tesla': ['tesla', 'supercharger', 'type 2', 'ccs'],
    'bmw': ['type 2', 'ccs', 'ccs2'],
    'mercedes': ['type 2', 'ccs', 'ccs2'],
    'audi': ['type 2', 'ccs', 'ccs2'],
    'volkswagen': ['type 2', 'ccs', 'ccs2'],
    'nissan': ['type 2', 'chademo', 'type 1'],
    'renault': ['type 2', 'ccs'],
    'hyundai': ['type 2', 'ccs', 'ccs2'],
    'kia': ['type 2', 'ccs', 'ccs2'],
    'mg': ['type 2', 'ccs'],
    'byd': ['type 2', 'ccs', 'gb/t'],
    'togg': ['type 2', 'ccs', 'ccs2'],
    'porsche': ['type 2', 'ccs', 'ccs2'],
  };

  const preferredConnectors = brandConnectors[brandLower] || ['type 2', 'ccs'];

  return stations.filter(station => {
    if (!station.Connections || station.Connections.length === 0) return false;

    return station.Connections.some(conn => {
      const connType = (conn.ConnectionType?.Title || '').toLowerCase();
      return preferredConnectors.some(pref => connType.includes(pref));
    });
  });
}
