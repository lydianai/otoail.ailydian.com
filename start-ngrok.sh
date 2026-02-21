#!/bin/bash

# ============================================
# TÜRK OTO AI - ngrok Starter Script
# Rate limiting ile ngrok tunnel başlatma
# ============================================

# Renkli output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  TÜRK OTO AI - ngrok Tunnel Starter ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Port kontrolü
PORT=${1:-3000}
DOMAIN=${2:-"turk-oto-ai"}

echo -e "${YELLOW}Port: ${PORT}${NC}"
echo -e "${YELLOW}Domain: ${DOMAIN}.ngrok.app${NC}"
echo ""

# Config file kontrolü
if [ ! -f "ngrok-rate-limit.yml" ]; then
    echo -e "${RED}Hata: ngrok-rate-limit.yml dosyası bulunamadı!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Rate limit config dosyası bulundu${NC}"
echo ""

# ngrok kurulu mu kontrol et
if ! command -v ngrok &> /dev/null; then
    echo -e "${RED}Hata: ngrok kurulu değil!${NC}"
    echo -e "${YELLOW}Kurulum için: https://ngrok.com/download${NC}"
    exit 1
fi

echo -e "${GREEN}✓ ngrok kurulu${NC}"
echo ""

# Next.js çalışıyor mu kontrol et
if ! lsof -Pi :${PORT} -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Uyarı: Port ${PORT} dinlenmiyor!${NC}"
    echo -e "${YELLOW}Lütfen önce 'npm run dev' ile uygulamayı başlatın${NC}"
    echo ""
    read -p "Devam etmek istiyor musunuz? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  ngrok Tunnel Başlatılıyor... ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# ngrok başlat
echo -e "${GREEN}Rate Limiting Kuralları:${NC}"
echo -e "  ${YELLOW}•${NC} API Endpoints: 100 req/min"
echo -e "  ${YELLOW}•${NC} AI Endpoints: 20 req/min"
echo -e "  ${YELLOW}•${NC} Auth Endpoints: 10 req/min"
echo -e "  ${YELLOW}•${NC} Battery Endpoints: 50 req/min"
echo ""

# ngrok komutunu oluştur
NGROK_CMD="ngrok http ${PORT} --domain ${DOMAIN}.ngrok.app --traffic-policy-file ngrok-rate-limit.yml"

echo -e "${GREEN}Komut: ${NGROK_CMD}${NC}"
echo ""
echo -e "${YELLOW}Durdurmak için: CTRL+C${NC}"
echo ""

# ngrok'u başlat
exec $NGROK_CMD
