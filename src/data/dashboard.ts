export type TrendPoint = { month: string; sales: number; profit: number; orders: number };
export type CategoryPoint = { name: string; value: number; profit: number };
export type RegionPoint = { region: string; sales: number; profit: number; orders: number };
export type ProductPoint = { name: string; category: string; revenue: number; target: number };

export const fullTrend: TrendPoint[] = [
  { month: 'Jan', sales: 118420, profit: 31200, orders: 842 },
  { month: 'Feb', sales: 109870, profit: 28940, orders: 791 },
  { month: 'Mar', sales: 132540, profit: 35120, orders: 924 },
  { month: 'Apr', sales: 121360, profit: 31840, orders: 867 },
  { month: 'May', sales: 142300, profit: 38640, orders: 982 },
  { month: 'Jun', sales: 156780, profit: 42910, orders: 1048 },
  { month: 'Jul', sales: 149210, profit: 40120, orders: 1012 },
  { month: 'Aug', sales: 168540, profit: 46280, orders: 1124 },
  { month: 'Sep', sales: 175920, profit: 48360, orders: 1178 },
  { month: 'Oct', sales: 192380, profit: 53210, orders: 1264 },
  { month: 'Nov', sales: 218640, profit: 61840, orders: 1389 },
  { month: 'Dec', sales: 241070, profit: 67920, orders: 1482 },
];

export const categories: CategoryPoint[] = [
  { name: 'Electronics', value: 222310, profit: 54340 },
  { name: 'Apparel',     value: 169970, profit: 44810 },
  { name: 'Home',        value: 118120, profit: 34040 },
];

export const regions: RegionPoint[] = [
  { region: 'West',  sales: 153730, profit: 40240, orders: 1058 },
  { region: 'East',  sales: 129600, profit: 33440, orders:  912 },
  { region: 'South', sales: 118650, profit: 30910, orders:  824 },
  { region: 'North', sales: 108420, profit: 28240, orders:  782 },
];

export const topProducts: ProductPoint[] = [
  { name: 'Aurora Wireless Earbuds',     category: 'Electronics', revenue: 38420, target: 42000 },
  { name: 'Summit Down Jacket',          category: 'Apparel',     revenue: 32810, target: 35000 },
  { name: 'Vortex Mechanical Keyboard',  category: 'Electronics', revenue: 26740, target: 28000 },
  { name: 'Hearth Ceramic Cookware Set', category: 'Home',        revenue: 21980, target: 24000 },
  { name: 'Echo Portable Speaker',       category: 'Electronics', revenue: 19240, target: 22000 },
  { name: 'Drift Running Shoes',         category: 'Apparel',     revenue: 17620, target: 20000 },
  { name: 'Nimbus Aromatherapy Diffuser',category: 'Home',        revenue: 14580, target: 18000 },
  { name: 'Coastline Linen Shirt',       category: 'Apparel',     revenue: 12940, target: 15000 },
];

// Filtered slices used by the dashboard filters
export const regionCategoryMatrix: Record<string, { sales: number; profit: number; orders: number }> = {
  'All-All':       { sales: 510400, profit: 138430, orders: 3576 },
  'North-All':     { sales: 108420, profit: 28240,  orders:  782 },
  'South-All':     { sales: 118650, profit: 30910,  orders:  824 },
  'East-All':      { sales: 129600, profit: 33440,  orders:  912 },
  'West-All':      { sales: 153730, profit: 40240,  orders: 1058 },
  'All-Electronics':{sales: 222310, profit: 54340,  orders: 1542 },
  'All-Apparel':    { sales: 169970, profit: 44810,  orders: 1184 },
  'All-Home':       { sales: 118120, profit: 34040,  orders:  850 },
};

export const monthlyByRegion: Record<string, TrendPoint[]> = {
  All: fullTrend,
  North: [
    { month: 'Jan', sales: 25100, profit: 6520, orders: 178 },
    { month: 'Feb', sales: 22840, profit: 5940, orders: 161 },
    { month: 'Mar', sales: 28120, profit: 7420, orders: 196 },
    { month: 'Apr', sales: 26410, profit: 6910, orders: 184 },
    { month: 'May', sales: 30180, profit: 8120, orders: 208 },
    { month: 'Jun', sales: 33240, profit: 9080, orders: 222 },
    { month: 'Jul', sales: 31620, profit: 8560, orders: 214 },
    { month: 'Aug', sales: 35840, profit: 9820, orders: 238 },
    { month: 'Sep', sales: 37210, profit: 10240, orders: 246 },
    { month: 'Oct', sales: 40820, profit: 11280, orders: 264 },
    { month: 'Nov', sales: 46280, profit: 13040, orders: 292 },
    { month: 'Dec', sales: 51120, profit: 14280, orders: 308 },
  ],
  South: [
    { month: 'Jan', sales: 27840, profit: 7240, orders: 192 },
    { month: 'Feb', sales: 26120, profit: 6810, orders: 184 },
    { month: 'Mar', sales: 31240, profit: 8240, orders: 218 },
    { month: 'Apr', sales: 28640, profit: 7520, orders: 202 },
    { month: 'May', sales: 33420, profit: 9020, orders: 230 },
    { month: 'Jun', sales: 36780, profit: 9980, orders: 248 },
    { month: 'Jul', sales: 34820, profit: 9420, orders: 236 },
    { month: 'Aug', sales: 39240, profit: 10720, orders: 262 },
    { month: 'Sep', sales: 40910, profit: 11240, orders: 274 },
    { month: 'Oct', sales: 44620, profit: 12320, orders: 290 },
    { month: 'Nov', sales: 50840, profit: 14240, orders: 318 },
    { month: 'Dec', sales: 56210, profit: 15740, orders: 338 },
  ],
  East: [
    { month: 'Jan', sales: 30240, profit: 7820, orders: 210 },
    { month: 'Feb', sales: 28140, profit: 7320, orders: 198 },
    { month: 'Mar', sales: 34020, profit: 9040, orders: 232 },
    { month: 'Apr', sales: 31240, profit: 8240, orders: 216 },
    { month: 'May', sales: 36420, profit: 9820, orders: 246 },
    { month: 'Jun', sales: 40180, profit: 10920, orders: 264 },
    { month: 'Jul', sales: 38240, profit: 10320, orders: 252 },
    { month: 'Aug', sales: 43020, profit: 11720, orders: 280 },
    { month: 'Sep', sales: 44810, profit: 12320, orders: 292 },
    { month: 'Oct', sales: 48940, profit: 13520, orders: 308 },
    { month: 'Nov', sales: 55620, profit: 15620, orders: 340 },
    { month: 'Dec', sales: 61440, profit: 17240, orders: 362 },
  ],
  West: [
    { month: 'Jan', sales: 35240, profit: 9620, orders: 262 },
    { month: 'Feb', sales: 32770, profit: 8870, orders: 248 },
    { month: 'Mar', sales: 39160, profit: 10620, orders: 278 },
    { month: 'Apr', sales: 35070, profit: 9560, orders: 265 },
    { month: 'May', sales: 42280, profit: 11680, orders: 298 },
    { month: 'Jun', sales: 46580, profit: 12940, orders: 314 },
    { month: 'Jul', sales: 44330, profit: 12220, orders: 310 },
    { month: 'Aug', sales: 50440, profit: 14020, orders: 344 },
    { month: 'Sep', sales: 52990, profit: 14540, orders: 366 },
    { month: 'Oct', sales: 58000, profit: 16040, orders: 402 },
    { month: 'Nov', sales: 65900, profit: 18940, orders: 439 },
    { month: 'Dec', sales: 72400, profit: 20460, orders: 474 },
  ],
};
