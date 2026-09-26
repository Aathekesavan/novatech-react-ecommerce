/**
 * NovaTech Product Catalog Data Model (INR Currency System)
 * Used for Task 2 Interactive React State & Dynamic Filtering
 */

import headphonesImg from '../assets/images/headphones.svg';
import smartwatchImg from '../assets/images/smartwatch.svg';
import laptopImg from '../assets/images/laptop.svg';
import earbudsImg from '../assets/images/earbuds.svg';
import speakerImg from '../assets/images/speaker.svg';
import cameraImg from '../assets/images/camera.svg';
import keyboardImg from '../assets/images/keyboard.svg';
import droneImg from '../assets/images/drone.svg';

export const PRODUCTS = [
  {
    id: 'prod-1',
    sku: 'NVP-920-BLK',
    name: 'NovaPro Wireless Studio ANC Headphones',
    category: 'audio',
    categoryLabel: 'Audio Gear',
    brand: 'NovaTech',
    price: 19999,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 1420,
    badge: 'sale',
    badgeText: 'Save 20%',
    inStock: true,
    image: headphonesImg,
    thumbnails: [headphonesImg, earbudsImg, speakerImg],
    tagline: 'Active Noise Cancellation • 45h Battery • Spatial Audio',
    description: 'Engineered for demanding music producers and everyday audiophiles. Featuring custom 45mm neodymium drivers, dual-chamber acoustic isolation, and industry-leading hybrid active noise cancellation that eliminates 98% of ambient noise.',
    colors: ['Matte Obsidian', 'Titanium Silver', 'Midnight Navy'],
    specs: {
      'Driver Size': '45mm Custom Neodymium Dynamic Drivers',
      'Frequency Response': '10 Hz – 40,000 Hz (Hi-Res Audio Certified)',
      'Noise Cancellation': 'Hybrid ANC with 4 microphones (-40dB isolation)',
      'Battery Runtime': '45 Hours (ANC On) / 60 Hours (ANC Off)',
      'Connectivity': 'Bluetooth 5.4, Multipoint 2-Device Pairing, 3.5mm Aux',
      'Codecs': 'LDAC, AAC, aptX Adaptive, SBC',
      'Weight': '255 grams'
    }
  },
  {
    id: 'prod-2',
    sku: 'AET-510-SLT',
    name: 'Aether Pulse Smart AMOLED Watch',
    category: 'wearables',
    categoryLabel: 'Smart Wearables',
    brand: 'Aether',
    price: 14999,
    originalPrice: 18999,
    rating: 4.7,
    reviewsCount: 980,
    badge: 'new',
    badgeText: 'New Arrival',
    inStock: true,
    image: smartwatchImg,
    thumbnails: [smartwatchImg, headphonesImg],
    tagline: 'Always-On 1.4" AMOLED • Dual-Band GPS • ECG & SpO2',
    description: 'The ultimate health and performance companion. Track over 120 sports activities, monitor continuous ECG heart health, and navigate with pinpoint dual-band satellite positioning.',
    colors: ['Slate Black', 'Lunar White', 'Graphite Grey'],
    specs: {
      'Display': '1.43" Ultra-Bright AMOLED (1000 nits)',
      'Battery Life': 'Up to 14 days typical usage (5 days Always-On)',
      'Water Resistance': '5 ATM (50 meters swimming proof)',
      'Sensors': 'Optical Heart Rate, SpO2, Barometer, ECG Sensor',
      'Compatibility': 'iOS 14.0+ & Android 9.0+'
    }
  },
  {
    id: 'prod-3',
    sku: 'ZEN-M3-16',
    name: 'Zenith Pro 16 M3 Max Ultrabook',
    category: 'computing',
    categoryLabel: 'Laptops & PCs',
    brand: 'Zenith',
    price: 74999,
    originalPrice: 94999,
    rating: 5.0,
    reviewsCount: 640,
    badge: 'featured',
    badgeText: 'Bestseller',
    inStock: true,
    image: laptopImg,
    thumbnails: [laptopImg, keyboardImg],
    tagline: '16-Core Silicon • 32GB Unified RAM • 1TB NVMe Gen4',
    description: 'A workstation beast packed into an ultra-thin 15mm aircraft-grade aluminum chassis. Designed for AI development, compilation workloads, and intensive video editing.',
    colors: ['Space Grey', 'Starlight Silver'],
    specs: {
      'Processor': 'Octa-Core High Performance 4.8GHz Max Boost',
      'Memory': '32GB LPDDR5X 7500MHz Unified Memory',
      'Storage': '1TB PCIe 4.0 NVMe SSD (up to 7000 MB/s)',
      'Display': '16.0" Liquid Retina IPS (3024 x 1964, 120Hz ProMotion)',
      'Battery': '99.6Wh lithium-polymer (up to 21 hours video playback)'
    }
  },
  {
    id: 'prod-4',
    sku: 'SON-AIR-PRO',
    name: 'SonicAir Pro True Wireless ANC Earbuds',
    category: 'audio',
    categoryLabel: 'Audio Gear',
    brand: 'SonicAir',
    price: 4999,
    originalPrice: 6999,
    rating: 4.6,
    reviewsCount: 2150,
    badge: null,
    badgeText: '',
    inStock: true,
    image: earbudsImg,
    thumbnails: [earbudsImg, headphonesImg],
    tagline: 'Smart Adaptive ANC • Wireless Qi Charging • 32h Total',
    description: 'Compact featherweight earbuds delivering studio-quality fidelity. Seamless device switching, IPX5 sweat resistance, and crystal-clear microphone beamforming for calls.',
    colors: ['Pearl White', 'Matte Black'],
    specs: {
      'Driver': '11mm Graphene Coated Dynamic Drivers',
      'Battery': '8h per charge + 24h from wireless case',
      'Microphones': '6-mic array with AI wind suppression',
      'Waterproof Rating': 'IPX5'
    }
  },
  {
    id: 'prod-5',
    sku: 'VOR-360-RUG',
    name: 'Vortex 360 Rugged Waterproof Speaker',
    category: 'audio',
    categoryLabel: 'Audio Gear',
    brand: 'NovaTech',
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 870,
    badge: null,
    badgeText: '',
    inStock: true,
    image: speakerImg,
    thumbnails: [speakerImg, headphonesImg],
    tagline: '360° Omnidirectional Sound • IP67 Waterproof & Dustproof',
    description: 'Take festival-grade sound wherever you roam. Dual passive radiators deliver deep, visceral bass, and party-sync mode connects up to 100 NovaTech speakers wirelessly.',
    colors: ['Forest Green', 'Ocean Blue', 'Midnight Black'],
    specs: {
      'Power Output': '40W RMS Dual Drivers',
      'Frequency': '50Hz – 20,000Hz',
      'Battery': '20 hours playtime with USB-C powerbank reverse charge',
      'Waterproof': 'IP67 Submersible'
    }
  },
  {
    id: 'prod-6',
    sku: 'LUM-4K-VLOG',
    name: 'Lumina 4K 60FPS Creator Mirrorless Camera',
    category: 'cameras',
    categoryLabel: 'Drones & Cameras',
    brand: 'Lumina',
    price: 29999,
    originalPrice: 39999,
    rating: 4.9,
    reviewsCount: 530,
    badge: 'sale',
    badgeText: 'Save 25%',
    inStock: true,
    image: cameraImg,
    thumbnails: [cameraImg, droneImg],
    tagline: '1-Inch CMOS Sensor • 5-Axis In-Body Stabilization • Flip Screen',
    description: 'Engineered specifically for vloggers, filmmakers, and content creators. Shoot buttery-smooth 4K 60FPS footage with instantaneous eye-tracking autofocus.',
    colors: ['Classic Black', 'Retro Silver'],
    specs: {
      'Sensor': '20.1 Megapixel 1.0-type stacked CMOS',
      'Video Resolution': '4K UHD up to 60fps, 1080p up to 120fps Slow-mo',
      'Autofocus': '315-point phase detection with Real-time Eye AF',
      'Screen': '3.0-inch 180° Vari-angle Touch LCD'
    }
  },
  {
    id: 'prod-7',
    sku: 'APX-RGB-MECH',
    name: 'Apex Pro Wireless Mechanical Keyboard',
    category: 'gaming',
    categoryLabel: 'Gaming Peripherals',
    brand: 'NovaTech',
    price: 6499,
    originalPrice: 8499,
    rating: 4.7,
    reviewsCount: 1120,
    badge: null,
    badgeText: '',
    inStock: true,
    image: keyboardImg,
    thumbnails: [keyboardImg, laptopImg],
    tagline: 'Hot-Swappable Optical Switches • PBT Keycaps • Per-Key RGB',
    description: 'Experience ultra-fast actuation and tactile satisfaction. Connect via lag-free 2.4GHz wireless, Bluetooth 5.2, or detachable braided USB-C cable.',
    colors: ['Stealth Dark', 'Glacier White'],
    specs: {
      'Switches': 'Hot-Swappable Custom Linear Red / Tactile Brown',
      'Layout': '75% Compact (84 keys) with aluminum volume roller',
      'Polling Rate': '1000Hz (1ms response time)',
      'Battery': '4000mAh (up to 200 hours RGB off)'
    }
  },
  {
    id: 'prod-8',
    sku: 'SKY-FALCON-4K',
    name: 'SkyFalcon 4K GPS Foldable Drone',
    category: 'cameras',
    categoryLabel: 'Drones & Cameras',
    brand: 'Aether',
    price: 44999,
    originalPrice: 59999,
    rating: 4.9,
    reviewsCount: 390,
    badge: 'new',
    badgeText: 'New',
    inStock: true,
    image: droneImg,
    thumbnails: [droneImg, cameraImg],
    tagline: 'Level-5 Wind Resistance • 38-Min Flight Time • 3-Axis Gimbal',
    description: 'Capture sweeping cinematic 4K vistas with automated AI flight modes, omnidirectional obstacle sensors, and a generous 10-kilometer video transmission range.',
    colors: ['Aerospace Grey'],
    specs: {
      'Camera': '4K HDR 1/2-Inch Sensor with 3-Axis Motorized Gimbal',
      'Flight Duration': 'Up to 38 minutes per intelligent flight battery',
      'Max Range': '10 km HD OcuSync Video Transmission',
      'Safety': 'GPS Auto Return-to-Home & Bottom Optical Flow Sensor'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', count: 8 },
  { id: 'audio', name: 'Audio & Sound', icon: '🎧', count: 3 },
  { id: 'wearables', name: 'Smart Wearables', icon: '⌚', count: 1 },
  { id: 'computing', name: 'Laptops & PCs', icon: '💻', count: 1 },
  { id: 'gaming', name: 'Gaming Peripherals', icon: '🎮', count: 1 },
  { id: 'cameras', name: 'Drones & Cameras', icon: '📷', count: 2 }
];

export const BRANDS = ['NovaTech', 'Aether', 'Zenith', 'SonicAir', 'Lumina'];
