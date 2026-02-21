/**
 * Inventory & Supply Chain Management Data Service
 * Medical supplies, equipment tracking, ordering for healthcare facilities
 */

export type ItemCategory =
  | 'Medical Supplies'
  | 'Surgical Instruments'
  | 'PPE'
  | 'Pharmaceuticals'
  | 'Diagnostic Equipment'
  | 'Patient Care'
  | 'Laboratory Supplies'
  | 'Radiology Supplies'
  | 'Office Supplies'
  | 'IT Equipment'

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order' | 'Discontinued'
export type UnitOfMeasure = 'Each' | 'Box' | 'Case' | 'Pack' | 'Bottle' | 'Bag' | 'Roll'

export interface InventoryItem {
  id: string
  itemCode: string
  itemName: string
  category: ItemCategory
  manufacturer?: string
  supplier: string
  unitOfMeasure: UnitOfMeasure
  quantityOnHand: number
  reorderLevel: number
  reorderQuantity: number
  unitCost: number
  totalValue: number
  location: string
  expirationDate?: Date
  status: StockStatus
  lastOrdered?: Date
  lotNumber?: string
  sterile?: boolean
  regulated?: boolean
}

export interface PurchaseOrder {
  id: string
  orderNumber: string
  supplier: string
  orderDate: Date
  expectedDelivery: Date
  status: 'Pending' | 'Approved' | 'Shipped' | 'Delivered' | 'Cancelled'
  totalAmount: number
  items: Array<{
    itemCode: string
    itemName: string
    quantity: number
    unitCost: number
    totalCost: number
  }>
  orderedBy: string
  approvedBy?: string
}

export interface InventoryStats {
  totalItems: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
  expiringItems: number
  onOrderItems: number
  averageDaysToReorder: number
  topCategories: Array<{ category: ItemCategory; count: number; value: number }>
}

// Common healthcare suppliers
export const healthcareSuppliers = [
  'Cardinal Health',
  'McKesson Medical-Surgical',
  'Medline Industries',
  'Henry Schein Medical',
  'Owens & Minor',
  'Concordance Healthcare',
  'Patterson Medical',
  'Stryker',
  'Zimmer Biomet',
  'Johnson & Johnson',
  'BD (Becton, Dickinson)',
  '3M Healthcare',
]

// Sample inventory items by category
const inventoryItemsByCategory: Record<
  ItemCategory,
  Array<{ name: string; manufacturer?: string; sterile?: boolean; regulated?: boolean }>
> = {
  'Medical Supplies': [
    { name: 'Exam Gloves (Nitrile)', manufacturer: 'Cardinal Health', sterile: false },
    { name: 'Syringes 3mL with Needle', manufacturer: 'BD', sterile: true },
    { name: 'IV Catheters 20G', manufacturer: 'BD', sterile: true },
    { name: 'Gauze Pads 4x4', manufacturer: 'Medline', sterile: true },
    { name: 'Adhesive Bandages', manufacturer: 'Johnson & Johnson', sterile: false },
    { name: 'Alcohol Prep Pads', manufacturer: '3M Healthcare', sterile: true },
    { name: 'Medical Tape 1"', manufacturer: '3M Healthcare', sterile: false },
    { name: 'Cotton Swabs Sterile', manufacturer: 'Medline', sterile: true },
  ],
  'Surgical Instruments': [
    { name: 'Scalpel Blade #10', manufacturer: 'BD', sterile: true },
    { name: 'Surgical Scissors', manufacturer: 'Stryker', sterile: true },
    { name: 'Hemostats', manufacturer: 'Zimmer Biomet', sterile: true },
    { name: 'Needle Holders', manufacturer: 'Stryker', sterile: true },
    { name: 'Suture Kit Absorbable', manufacturer: 'Ethicon', sterile: true },
    { name: 'Surgical Drapes Sterile', manufacturer: '3M Healthcare', sterile: true },
  ],
  PPE: [
    { name: 'N95 Respirator Masks', manufacturer: '3M Healthcare', sterile: false },
    { name: 'Surgical Masks Level 3', manufacturer: 'Cardinal Health', sterile: false },
    { name: 'Face Shields', manufacturer: 'Medline', sterile: false },
    { name: 'Isolation Gowns', manufacturer: 'Cardinal Health', sterile: false },
    { name: 'Shoe Covers', manufacturer: 'Medline', sterile: false },
    { name: 'Hair Covers (Bouffant)', manufacturer: 'Cardinal Health', sterile: false },
  ],
  Pharmaceuticals: [
    { name: 'Normal Saline 0.9% 1000mL', manufacturer: 'Baxter', regulated: true },
    { name: 'Lactated Ringers 1000mL', manufacturer: 'Baxter', regulated: true },
    { name: 'Heparin Lock Flush', manufacturer: 'Fresenius Kabi', regulated: true },
    { name: 'Lidocaine 1% Injectable', manufacturer: 'Hospira', regulated: true },
  ],
  'Diagnostic Equipment': [
    { name: 'Blood Pressure Cuffs Adult', manufacturer: 'Welch Allyn', sterile: false },
    { name: 'Thermometer Probe Covers', manufacturer: 'Welch Allyn', sterile: false },
    { name: 'Pulse Oximeter Probes', manufacturer: 'Masimo', sterile: false },
    { name: 'EKG Electrodes', manufacturer: '3M Healthcare', sterile: false },
  ],
  'Patient Care': [
    { name: 'Hospital Gowns', manufacturer: 'Medline', sterile: false },
    { name: 'Adult Diapers Large', manufacturer: 'Cardinal Health', sterile: false },
    { name: 'Bed Pads Disposable', manufacturer: 'Medline', sterile: false },
    { name: 'Patient Wipes', manufacturer: 'Medline', sterile: false },
    { name: 'Urinary Catheters Foley 16Fr', manufacturer: 'Bard Medical', sterile: true },
  ],
  'Laboratory Supplies': [
    { name: 'Blood Collection Tubes EDTA', manufacturer: 'BD', sterile: true },
    { name: 'Specimen Containers', manufacturer: 'Cardinal Health', sterile: true },
    { name: 'Pipette Tips 1000uL', manufacturer: 'Eppendorf', sterile: false },
    { name: 'Microscope Slides', manufacturer: 'Fisher Scientific', sterile: false },
  ],
  'Radiology Supplies': [
    { name: 'Contrast Media Iodinated', manufacturer: 'Bracco', regulated: true },
    { name: 'X-Ray Film 14x17', manufacturer: 'Carestream', sterile: false },
    { name: 'Lead Aprons', manufacturer: 'Infab', sterile: false },
  ],
  'Office Supplies': [
    { name: 'Copy Paper (Case)', manufacturer: 'Office Depot', sterile: false },
    { name: 'Pens Black Box/12', manufacturer: 'Office Depot', sterile: false },
    { name: 'File Folders Letter', manufacturer: 'Office Depot', sterile: false },
  ],
  'IT Equipment': [
    { name: 'Laptop Dell Latitude', manufacturer: 'Dell', sterile: false },
    { name: 'Wireless Mouse', manufacturer: 'Logitech', sterile: false },
    { name: 'Network Cables Cat6', manufacturer: 'Monoprice', sterile: false },
  ],
}

// Storage locations
const storageLocations = [
  'Central Supply - Floor 1',
  'Central Supply - Floor 2',
  'Pharmacy Stockroom',
  'OR Supply Room',
  'ER Supply Room',
  'ICU Supply Room',
  'Lab Supply Room',
  'Radiology Supply',
  'Medical Records',
  'IT Equipment Room',
]

export function generateInventoryItems(count: number = 200): InventoryItem[] {
  const items: InventoryItem[] = []
  const categories = Object.keys(inventoryItemsByCategory) as ItemCategory[]

  let itemId = 1

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const categoryItems = inventoryItemsByCategory[category]
    const itemData = categoryItems[Math.floor(Math.random() * categoryItems.length)]
    const supplier =
      healthcareSuppliers[Math.floor(Math.random() * healthcareSuppliers.length)]
    const location =
      storageLocations[Math.floor(Math.random() * storageLocations.length)]

    const unitOfMeasures: UnitOfMeasure[] = ['Each', 'Box', 'Case', 'Pack', 'Bottle']
    const unitOfMeasure =
      unitOfMeasures[Math.floor(Math.random() * unitOfMeasures.length)]

    const reorderLevel = Math.floor(Math.random() * 50) + 10
    const quantityOnHand = Math.floor(Math.random() * 200)
    const reorderQuantity = reorderLevel * 3

    let status: StockStatus
    if (quantityOnHand === 0) {
      status = 'Out of Stock'
    } else if (quantityOnHand <= reorderLevel) {
      status = 'Low Stock'
    } else if (Math.random() > 0.9) {
      status = 'On Order'
    } else {
      status = 'In Stock'
    }

    const unitCost = Math.floor(Math.random() * 100) + 1
    const totalValue = quantityOnHand * unitCost

    // Add expiration date for certain items
    let expirationDate: Date | undefined
    if (itemData.sterile || itemData.regulated) {
      expirationDate = new Date()
      // Random expiration between -30 days and +365 days
      const daysOffset = Math.floor(Math.random() * 395) - 30
      expirationDate.setDate(expirationDate.getDate() + daysOffset)
    }

    const lastOrdered = new Date()
    lastOrdered.setDate(lastOrdered.getDate() - Math.floor(Math.random() * 60))

    const item: InventoryItem = {
      id: `INV-${String(itemId++).padStart(6, '0')}`,
      itemCode: `ITM${String(Math.floor(Math.random() * 90000) + 10000)}`,
      itemName: itemData.name,
      category,
      manufacturer: itemData.manufacturer,
      supplier,
      unitOfMeasure,
      quantityOnHand,
      reorderLevel,
      reorderQuantity,
      unitCost,
      totalValue,
      location,
      expirationDate,
      status,
      lastOrdered,
      lotNumber: itemData.sterile
        ? `LOT${Math.floor(Math.random() * 900000) + 100000}`
        : undefined,
      sterile: itemData.sterile,
      regulated: itemData.regulated,
    }

    items.push(item)
  }

  return items.sort((a, b) => a.itemName.localeCompare(b.itemName))
}

export function generatePurchaseOrders(
  items: InventoryItem[],
  count: number = 25
): PurchaseOrder[] {
  const orders: PurchaseOrder[] = []

  const staffNames = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Thompson',
    'Lisa Anderson',
  ]

  const statuses: Array<'Pending' | 'Approved' | 'Shipped' | 'Delivered' | 'Cancelled'> = [
    'Approved',
    'Shipped',
    'Delivered',
    'Pending',
  ]

  for (let i = 0; i < count; i++) {
    const orderDate = new Date()
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30))

    const expectedDelivery = new Date(orderDate)
    expectedDelivery.setDate(expectedDelivery.getDate() + Math.floor(Math.random() * 14) + 1)

    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const supplier =
      healthcareSuppliers[Math.floor(Math.random() * healthcareSuppliers.length)]

    // Select random items for this order
    const numItems = Math.floor(Math.random() * 5) + 1
    const orderItems = []
    let totalAmount = 0

    for (let j = 0; j < numItems; j++) {
      const item = items[Math.floor(Math.random() * items.length)]
      const quantity = Math.floor(Math.random() * 50) + 10
      const totalCost = quantity * item.unitCost

      orderItems.push({
        itemCode: item.itemCode,
        itemName: item.itemName,
        quantity,
        unitCost: item.unitCost,
        totalCost,
      })

      totalAmount += totalCost
    }

    const orderedBy = staffNames[Math.floor(Math.random() * staffNames.length)]
    const approvedBy =
      status !== 'Pending' ? staffNames[Math.floor(Math.random() * staffNames.length)] : undefined

    orders.push({
      id: `PO-${String(i + 1).padStart(6, '0')}`,
      orderNumber: `PO${Math.floor(Math.random() * 900000) + 100000}`,
      supplier,
      orderDate,
      expectedDelivery,
      status,
      totalAmount,
      items: orderItems,
      orderedBy,
      approvedBy,
    })
  }

  return orders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime())
}

export function calculateInventoryStats(items: InventoryItem[]): InventoryStats {
  const now = new Date()
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

  const categoryStats = new Map<ItemCategory, { count: number; value: number }>()

  items.forEach((item) => {
    const existing = categoryStats.get(item.category) || { count: 0, value: 0 }
    categoryStats.set(item.category, {
      count: existing.count + 1,
      value: existing.value + item.totalValue,
    })
  })

  const topCategories = Array.from(categoryStats.entries())
    .map(([category, stats]) => ({
      category,
      count: stats.count,
      value: stats.value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  return {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + item.totalValue, 0),
    lowStockItems: items.filter((item) => item.status === 'Low Stock').length,
    outOfStockItems: items.filter((item) => item.status === 'Out of Stock').length,
    expiringItems: items.filter(
      (item) =>
        item.expirationDate &&
        item.expirationDate > now &&
        item.expirationDate <= thirtyDaysFromNow
    ).length,
    onOrderItems: items.filter((item) => item.status === 'On Order').length,
    averageDaysToReorder: 15,
    topCategories,
  }
}

export const sampleInventory = generateInventoryItems(200)
export const samplePurchaseOrders = generatePurchaseOrders(sampleInventory, 25)
