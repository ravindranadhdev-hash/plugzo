export interface EVBusiness {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  amazonAffiliate?: string;
  founded: string;
  headquarters: string;
  models: EVModel[];
  category: 'cars' | 'bikes' | 'scooters' | 'commercial';
}

export interface EVModel {
  id: string;
  name: string;
  type: 'car' | 'bike' | 'scooter' | 'commercial';
  price: string;
  range: string;
  topSpeed: string;
  image: string;
  amazonLink?: string;
}

export const EV_BUSINESSES: EVBusiness[] = [
  {
    id: 'tesla',
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/200px-Tesla_Motors.svg.png',
    description: 'Leading electric vehicle manufacturer with cutting-edge autonomous driving technology and supercharger network.',
    website: 'https://www.tesla.com',
    amazonAffiliate: 'https://www.amazon.com/s?k=tesla+accessories&tag=your-affiliate-tag',
    founded: '2003',
    headquarters: 'Austin, Texas, USA',
    category: 'cars',
    models: [
      {
        id: 'model-3',
        name: 'Model 3',
        type: 'car',
        price: '$38,990',
        range: '358 miles',
        topSpeed: '140 mph',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/2021_Tesla_Model_3.jpg/640px-2021_Tesla_Model_3.jpg',
        amazonLink: 'https://www.amazon.com/s?k=tesla+model+3+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'model-y',
        name: 'Model Y',
        type: 'car',
        price: '$43,990',
        range: '330 miles',
        topSpeed: '135 mph',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Tesla_Model_Y.jpg/640px-Tesla_Model_Y.jpg',
        amazonLink: 'https://www.amazon.com/s?k=tesla+model+y+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'model-s',
        name: 'Model S',
        type: 'car',
        price: 'Starting at $89,990',
        range: '405 miles',
        topSpeed: '155 mph',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tesla_Model_S_2021.jpg/640px-Tesla_Model_S_2021.jpg',
        amazonLink: 'https://www.amazon.com/s?k=tesla+model+s+accessories&tag=your-affiliate-tag'
      }
    ]
  },
  {
    id: 'tata-motors',
    name: 'Tata Motors',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Tata_Motors_Logo.svg/200px-Tata_Motors_Logo.svg.png',
    description: 'India\'s largest automobile manufacturer pioneering affordable electric vehicles for the mass market.',
    website: 'https://www.tatamotors.com/electric-vehicles',
    amazonAffiliate: 'https://www.amazon.com/s?k=tata+ev+accessories&tag=your-affiliate-tag',
    founded: '1945',
    headquarters: 'Mumbai, Maharashtra, India',
    category: 'cars',
    models: [
      {
        id: 'nexon-ev',
        name: 'Nexon EV',
        type: 'car',
        price: '₹14.49 Lakhs',
        range: '453 km',
        topSpeed: '140 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tata_Nexon_EV_front.jpg/640px-Tata_Nexon_EV_front.jpg',
        amazonLink: 'https://www.amazon.com/s?k=nexon+ev+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'tiago-ev',
        name: 'Tiago EV',
        type: 'car',
        price: '₹8.49 Lakhs',
        range: '315 km',
        topSpeed: '120 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tata_Tiago_EV.jpg/640px-Tata_Tiago_EV.jpg',
        amazonLink: 'https://www.amazon.com/s?k=tiago+ev+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'punch-ev',
        name: 'Punch EV',
        type: 'car',
        price: '₹12.49 Lakhs',
        range: '421 km',
        topSpeed: '140 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tata_Punch_EV.jpg/640px-Tata_Punch_EV.jpg',
        amazonLink: 'https://www.amazon.com/s?k=punch+ev+accessories&tag=your-affiliate-tag'
      }
    ]
  },
  {
    id: 'ola-electric',
    name: 'Ola Electric',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ola_Electric_Logo.svg/200px-Ola_Electric_Logo.svg.png',
    description: 'Revolutionary electric scooter manufacturer with advanced battery technology and IoT features.',
    website: 'https://www.olaelectric.com',
    amazonAffiliate: 'https://www.amazon.com/s?k=ola+electric+accessories&tag=your-affiliate-tag',
    founded: '2017',
    headquarters: 'Bangalore, Karnataka, India',
    category: 'scooters',
    models: [
      {
        id: 's1-pro',
        name: 'S1 Pro',
        type: 'scooter',
        price: '₹1.45 Lakhs',
        range: '195 km',
        topSpeed: '115 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ola_S1_Pro.jpg/640px-Ola_S1_Pro.jpg',
        amazonLink: 'https://www.amazon.com/s?k=ola+s1+pro+accessories&tag=your-affiliate-tag'
      },
      {
        id: 's1-air',
        name: 'S1 Air',
        type: 'scooter',
        price: '₹1.07 Lakhs',
        range: '151 km',
        topSpeed: '95 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ola_S1_Air.jpg/640px-Ola_S1_Air.jpg',
        amazonLink: 'https://www.amazon.com/s?k=ola+s1+air+accessories&tag=your-affiliate-tag'
      }
    ]
  },
  {
    id: 'ather-energy',
    name: 'Ather Energy',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ather_Energy_Logo.svg/200px-Ather_Energy_Logo.svg.png',
    description: 'Premium electric scooter manufacturer with smart connectivity and performance-focused design.',
    website: 'https://www.atherenergy.com',
    amazonAffiliate: 'https://www.amazon.com/s?k=ather+accessories&tag=your-affiliate-tag',
    founded: '2013',
    headquarters: 'Chennai, Tamil Nadu, India',
    category: 'scooters',
    models: [
      {
        id: '450x',
        name: '450X',
        type: 'scooter',
        price: '₹1.45 Lakhs',
        range: '150 km',
        topSpeed: '100 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Ather_450X.jpg/640px-Ather_450X.jpg',
        amazonLink: 'https://www.amazon.com/s?k=ather+450x+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'rizta',
        name: 'Rizta',
        type: 'scooter',
        price: '₹1.25 Lakhs',
        range: '160 km',
        topSpeed: '80 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Ather_Rizta.jpg/640px-Ather_Rizta.jpg',
        amazonLink: 'https://www.amazon.com/s?k=ather+rizta+accessories&tag=your-affiliate-tag'
      }
    ]
  },
  {
    id: 'revolt-motors',
    name: 'Revolt Motors',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Revolt_Motors_Logo.svg/200px-Revolt_Motors_Logo.svg.png',
    description: 'India\'s first AI-enabled electric motorcycle manufacturer with swappable battery technology.',
    website: 'https://www.revoltmotors.com',
    amazonAffiliate: 'https://www.amazon.com/s?k=revolt+accessories&tag=your-affiliate-tag',
    founded: '2017',
    headquarters: 'New Delhi, India',
    category: 'bikes',
    models: [
      {
        id: 'rv400',
        name: 'RV400',
        type: 'bike',
        price: '₹1.38 Lakhs',
        range: '150 km',
        topSpeed: '85 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Revolt_RV400.jpg/640px-Revolt_RV400.jpg',
        amazonLink: 'https://www.amazon.com/s?k=revolt+rv400+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'rv300',
        name: 'RV300',
        type: 'bike',
        price: '₹1.18 Lakhs',
        range: '180 km',
        topSpeed: '65 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Revolt_RV300.jpg/640px-Revolt_RV300.jpg',
        amazonLink: 'https://www.amazon.com/s?k=revolt+rv300+accessories&tag=your-affiliate-tag'
      }
    ]
  },
  {
    id: 'byd',
    name: 'BYD',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/BYD_logo.svg/200px-BYD_logo.svg.png',
    description: 'Leading Chinese EV manufacturer with advanced battery technology and global presence.',
    website: 'https://www.byd.com/global',
    amazonAffiliate: 'https://www.amazon.com/s?k=byd+ev+accessories&tag=your-affiliate-tag',
    founded: '1995',
    headquarters: 'Shenzhen, Guangdong, China',
    category: 'cars',
    models: [
      {
        id: 'byd-seal',
        name: 'Seal',
        type: 'car',
        price: '₹41 Lakhs',
        range: '700 km',
        topSpeed: '180 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BYD_Seal.jpg/640px-BYD_Seal.jpg',
        amazonLink: 'https://www.amazon.com/s?k=byd+seal+accessories&tag=your-affiliate-tag'
      },
      {
        id: 'byd-atto3',
        name: 'Atto 3',
        type: 'car',
        price: '₹34 Lakhs',
        range: '521 km',
        topSpeed: '160 km/h',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/BYD_Atto_3.jpg/640px-BYD_Atto_3.jpg',
        amazonLink: 'https://www.amazon.com/s?k=byd+atto3+accessories&tag=your-affiliate-tag'
      }
    ]
  }
];
