export const revenueData = [
  { month:'Jan', revenue:52400, target:50000 }, { month:'Feb', revenue:61200, target:55000 },
  { month:'Mar', revenue:58900, target:60000 }, { month:'Apr', revenue:71500, target:65000 },
  { month:'May', revenue:84200, target:75000 }, { month:'Jun', revenue:79300, target:80000 },
  { month:'Jul', revenue:91600, target:85000 }, { month:'Aug', revenue:88400, target:90000 },
  { month:'Sep', revenue:103200, target:95000 }, { month:'Oct', revenue:112800, target:105000 },
  { month:'Nov', revenue:98700, target:110000 }, { month:'Dec', revenue:124500, target:120000 }
];

export const salesData = [
  { week:'Week 1', Electronics:12400, Clothing:8200, Food:6100, Furniture:4300 },
  { week:'Week 2', Electronics:15200, Clothing:9400, Food:7200, Furniture:5100 },
  { week:'Week 3', Electronics:11800, Clothing:10200, Food:6800, Furniture:4800 },
  { week:'Week 4', Electronics:18600, Clothing:11500, Food:8400, Furniture:6200 }
];

export const customerGrowthData = [
  { month:'Jan', customers:2840, churned:120 }, { month:'Feb', customers:2980, churned:95 },
  { month:'Mar', customers:3120, churned:110 }, { month:'Apr', customers:3250, churned:88 },
  { month:'May', customers:3380, churned:102 }, { month:'Jun', customers:3490, churned:76 },
  { month:'Jul', customers:3610, churned:84 }, { month:'Aug', customers:3720, churned:91 },
  { month:'Sep', customers:3810, churned:68 }, { month:'Oct', customers:3890, churned:79 },
  { month:'Nov', customers:3940, churned:72 }, { month:'Dec', customers:3847, churned:65 }
];

export const regionalData = [
  { region:'North America', revenue:428000, orders:2840, growth:12.4 },
  { region:'Europe', revenue:312000, orders:2180, growth:8.7 },
  { region:'Asia Pacific', revenue:284000, orders:1920, growth:18.2 },
  { region:'Latin America', revenue:142000, orders:980, growth:22.1 },
  { region:'Middle East', revenue:98000, orders:640, growth:15.6 },
  { region:'Africa', revenue:62000, orders:420, growth:28.4 }
];

export const productData = [
  { name:'MacBook Pro', revenue:284000, units:420, growth:8.2, margin:32 },
  { name:'iPhone 15', revenue:218000, units:840, growth:14.6, margin:28 },
  { name:'AirPods Pro', revenue:142000, units:1820, growth:22.4, margin:45 },
  { name:'iPad Air', revenue:98000, units:620, growth:-4.2, margin:24 },
  { name:'Apple Watch', revenue:86000, units:740, growth:6.8, margin:38 },
  { name:'HomePod', revenue:42000, units:280, growth:-8.4, margin:18 },
  { name:'Mac Mini', revenue:38000, units:180, growth:12.0, margin:22 },
  { name:'Apple TV', revenue:24000, units:320, growth:-2.8, margin:20 }
];

export const transactions = [
  { id:'TXN001', customer:'Sarah Johnson', amount:1249.99, status:'completed', date:'2024-12-20', method:'Credit Card', category:'Electronics' },
  { id:'TXN002', customer:'Michael Chen', amount:89.99, status:'failed', date:'2024-12-20', method:'Debit Card', category:'Clothing' },
  { id:'TXN003', customer:'Emily Davis', amount:2499.00, status:'completed', date:'2024-12-19', method:'PayPal', category:'Electronics' },
  { id:'TXN004', customer:'James Wilson', amount:349.50, status:'pending', date:'2024-12-19', method:'Credit Card', category:'Furniture' },
  { id:'TXN005', customer:'Lisa Thompson', amount:129.99, status:'failed', date:'2024-12-19', method:'Debit Card', category:'Food' },
  { id:'TXN006', customer:'Robert Garcia', amount:899.00, status:'completed', date:'2024-12-18', method:'Credit Card', category:'Electronics' },
  { id:'TXN007', customer:'Jennifer Martinez', amount:54.99, status:'failed', date:'2024-12-18', method:'Credit Card', category:'Clothing' },
  { id:'TXN008', customer:'David Anderson', amount:1599.99, status:'completed', date:'2024-12-18', method:'Bank Transfer', category:'Electronics' },
  { id:'TXN009', customer:'Ashley Brown', amount:299.00, status:'pending', date:'2024-12-17', method:'PayPal', category:'Furniture' },
  { id:'TXN010', customer:'Christopher Lee', amount:79.99, status:'completed', date:'2024-12-17', method:'Debit Card', category:'Food' },
  { id:'TXN011', customer:'Amanda White', amount:449.99, status:'completed', date:'2024-12-17', method:'Credit Card', category:'Clothing' },
  { id:'TXN012', customer:'Daniel Harris', amount:3299.00, status:'failed', date:'2024-12-16', method:'Credit Card', category:'Electronics' },
  { id:'TXN013', customer:'Michelle Clark', amount:189.50, status:'completed', date:'2024-12-16', method:'PayPal', category:'Furniture' },
  { id:'TXN014', customer:'Kevin Lewis', amount:64.99, status:'completed', date:'2024-12-16', method:'Debit Card', category:'Food' },
  { id:'TXN015', customer:'Stephanie Walker', amount:999.99, status:'failed', date:'2024-12-15', method:'Credit Card', category:'Electronics' },
  { id:'TXN016', customer:'Brian Hall', amount:229.00, status:'completed', date:'2024-12-15', method:'Credit Card', category:'Clothing' },
  { id:'TXN017', customer:'Rachel Young', amount:1849.99, status:'completed', date:'2024-12-15', method:'Bank Transfer', category:'Electronics' },
  { id:'TXN018', customer:'Jason King', amount:44.99, status:'pending', date:'2024-12-14', method:'Debit Card', category:'Food' },
  { id:'TXN019', customer:'Megan Scott', amount:749.00, status:'completed', date:'2024-12-14', method:'Credit Card', category:'Electronics' },
  { id:'TXN020', customer:'Tyler Adams', amount:159.99, status:'failed', date:'2024-12-14', method:'Debit Card', category:'Clothing' }
];

export const marketingData = {
  channels: [
    { name:'Email', spend:12400, conversions:842, roi:6.8 },
    { name:'Social Media', spend:18600, conversions:1240, roi:6.7 },
    { name:'Paid Search', spend:28400, conversions:1680, roi:5.9 },
    { name:'Organic', spend:4200, conversions:940, roi:22.4 },
    { name:'Referral', spend:6800, conversions:620, roi:9.1 }
  ]
};

export const notifications = [
  { id:1, type:'warning', message:'Payment processing failure rate increased to 8.2%', time:'5 min ago', read:false },
  { id:2, type:'success', message:'Monthly revenue target achieved: $124,500', time:'1 hour ago', read:false },
  { id:3, type:'info', message:'New customer signup spike: +142 today', time:'2 hours ago', read:true },
  { id:4, type:'warning', message:'Inventory low: HomePod (12 units remaining)', time:'3 hours ago', read:false },
  { id:5, type:'success', message:'Campaign "Holiday Sale" ROI reached 340%', time:'5 hours ago', read:true },
  { id:6, type:'info', message:'Q4 financial report ready for review', time:'1 day ago', read:true },
  { id:7, type:'warning', message:'3 high-value customers showing churn signals', time:'1 day ago', read:false },
  { id:8, type:'info', message:'System maintenance scheduled for Dec 25 at 2:00 AM', time:'2 days ago', read:true }
];

export const kpiData = {
  totalRevenue: 1284750,
  revenueGrowth: 12.4,
  totalOrders: 8492,
  orderGrowth: 8.7,
  activeCustomers: 3847,
  customerGrowth: 6.2,
  conversionRate: 3.24,
  conversionGrowth: -0.8
};
