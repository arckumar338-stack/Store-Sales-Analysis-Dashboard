export type RawRow = {
  id: string;
  orderId: string;
  orderDate: string;
  customerName: string;
  customerAge: string;
  region: string;
  category: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  salesAmount: string;
  discount: string;
  profit: string;
};

export const rawSales: RawRow[] = [
  { id: '1', orderId: 'ORD-1001', orderDate: '2023/11-01', customerName: 'Sarah Chen',     customerAge: '34',  region: 'West',  category: 'Electronics', productName: 'Aurora Wireless Earbuds',     quantity: '2', unitPrice: '89.99',   salesAmount: '179.98',  discount: '0',    profit: '54.20' },
  { id: '2', orderId: 'ORD-1002', orderDate: '02-05-2023', customerName: 'Marcus Reed',    customerAge: '',    region: 'East',  category: 'Apparel',    productName: 'Trailhead Hiking Boots',       quantity: '1', unitPrice: '129.00',  salesAmount: '129.00',  discount: '10',   profit: '31.40' },
  { id: '3', orderId: 'ORD-1003', orderDate: '2023/11-03', customerName: 'Priya Nair',     customerAge: '29',  region: 'South', category: 'Home',       productName: 'Nimbus Aromatherapy Diffuser', quantity: '3', unitPrice: '42.50',   salesAmount: '127.50',  discount: '0',    profit: '38.10' },
  { id: '4', orderId: 'ORD-1004', orderDate: '11/04/2023', customerName: 'Jonas Weber',    customerAge: '52',  region: 'North', category: 'Electronics', productName: 'Pulse Smart Scale',            quantity: '1', unitPrice: '64.99',   salesAmount: '-64.99',  discount: '0',    profit: '-12.40' },
  { id: '5', orderId: 'ORD-1005', orderDate: '2023/13-05', customerName: 'Amara Okafor',   customerAge: '41',  region: 'West',  category: 'Apparel',    productName: 'Summit Down Jacket',           quantity: '2', unitPrice: '219.00',  salesAmount: '438.00',  discount: '15',   profit: '96.50' },
  { id: '6', orderId: 'ORD-1006', orderDate: '06-05-2023', customerName: 'Sarah Chen',     customerAge: '34',  region: 'West',  category: 'Electronics', productName: 'Aurora Wireless Earbuds',     quantity: '2', unitPrice: '89.99',   salesAmount: '179.98',  discount: '0',    profit: '54.20' },
  { id: '7', orderId: 'ORD-1007', orderDate: '2023/11-07', customerName: 'Diego Santos',   customerAge: '27',  region: 'South', category: 'Home',       productName: 'Hearth Ceramic Cookware Set',  quantity: '1', unitPrice: '189.00',  salesAmount: '189.00',  discount: '5',    profit: '47.80' },
  { id: '8', orderId: 'ORD-1008', orderDate: '08-05-2023', customerName: 'Yuki Tanaka',    customerAge: '',    region: 'North', category: 'Electronics', productName: 'Vortex Mechanical Keyboard',   quantity: '1', unitPrice: '149.00',  salesAmount: '149.00',  discount: '0',    profit: '33.10' },
  { id: '9', orderId: 'ORD-1009', orderDate: '2023/11-09', customerName: 'Liam Murphy',    customerAge: '38',  region: 'East',  category: 'Apparel',    productName: 'Coastline Linen Shirt',        quantity: '4', unitPrice: '58.00',   salesAmount: '232.00',  discount: '0',    profit: '69.80' },
  { id: '10', orderId: 'ORD-1010', orderDate: '2023/11-10', customerName: 'Fatima Zahra',   customerAge: '46',  region: 'West',  category: 'Home',       productName: 'Lumen LED Desk Lamp',          quantity: '2', unitPrice: '38.00',   salesAmount: '76.00',   discount: '0',    profit: '22.70' },
  { id: '11', orderId: 'ORD-1011', orderDate: '13-05-2023', customerName: 'Noah Bergström',  customerAge: '31', region: 'North', category: 'Electronics', productName: 'Echo Portable Speaker',        quantity: '3', unitPrice: '79.99',   salesAmount: '-239.97', discount: '0',    profit: '-41.20' },
  { id: '12', orderId: 'ORD-1012', orderDate: '2023/11-12', customerName: 'Isabella Romano', customerAge: '33', region: 'East',  category: 'Apparel',    productName: 'Drift Running Shoes',          quantity: '1', unitPrice: '115.00',  salesAmount: '115.00',  discount: '10',   profit: '28.90' },
  { id: '13', orderId: 'ORD-1013', orderDate: '2023/11-13', customerName: 'Kwame Mensah',  customerAge: '58',  region: 'South', category: 'Home',       productName: 'Terra Plant Care Kit',         quantity: '2', unitPrice: '34.50',   salesAmount: '69.00',   discount: '0',    profit: '20.60' },
  { id: '14', orderId: 'ORD-1014', orderDate: '14-05-2023', customerName: 'Elena Petrov',  customerAge: '',    region: 'West',  category: 'Electronics', productName: 'Helix USB-C Hub',              quantity: '2', unitPrice: '54.99',   salesAmount: '109.98',  discount: '0',    profit: '32.50' },
  { id: '15', orderId: 'ORD-1015', orderDate: '2023/11-15', customerName: 'Rahul Verma',   customerAge: '36',  region: 'East',  category: 'Apparel',    productName: 'Summit Down Jacket',           quantity: '1', unitPrice: '219.00',  salesAmount: '219.00',  discount: '15',   profit: '48.20' },
];

export type CleanRow = {
  orderId: string;
  orderDate: string;
  customerId: string;
  customerName: string;
  customerAge: number;
  region: string;
  category: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  salesAmount: number;
  discountPct: number;
  profit: number;
};

export const cleanedSales: CleanRow[] = [
  { orderId: 'ORD-1001', orderDate: '2023-11-01', customerId: 'CUST-014', customerName: 'Sarah Chen',       customerAge: 34, region: 'West',  category: 'Electronics', productName: 'Aurora Wireless Earbuds',     quantity: 2, unitPrice: 89.99,  salesAmount: 179.98, discountPct: 0,  profit: 54.20 },
  { orderId: 'ORD-1002', orderDate: '2023-05-02', customerId: 'CUST-031', customerName: 'Marcus Reed',      customerAge: 38, region: 'East',  category: 'Apparel',    productName: 'Trailhead Hiking Boots',       quantity: 1, unitPrice: 129.00, salesAmount: 116.10, discountPct: 10, profit: 31.40 },
  { orderId: 'ORD-1003', orderDate: '2023-11-03', customerId: 'CUST-022', customerName: 'Priya Nair',       customerAge: 29, region: 'South', category: 'Home',       productName: 'Nimbus Aromatherapy Diffuser', quantity: 3, unitPrice: 42.50,  salesAmount: 127.50, discountPct: 0,  profit: 38.10 },
  { orderId: 'ORD-1004', orderDate: '2023-11-04', customerId: 'CUST-008', customerName: 'Jonas Weber',      customerAge: 52, region: 'North', category: 'Electronics', productName: 'Pulse Smart Scale',            quantity: 1, unitPrice: 64.99,  salesAmount: 64.99,  discountPct: 0,  profit: 12.40 },
  { orderId: 'ORD-1005', orderDate: '2023-11-05', customerId: 'CUST-045', customerName: 'Amara Okafor',     customerAge: 41, region: 'West',  category: 'Apparel',    productName: 'Summit Down Jacket',           quantity: 2, unitPrice: 219.00, salesAmount: 372.30, discountPct: 15, profit: 96.50 },
  { orderId: 'ORD-1007', orderDate: '2023-11-07', customerId: 'CUST-019', customerName: 'Diego Santos',     customerAge: 27, region: 'South', category: 'Home',       productName: 'Hearth Ceramic Cookware Set',  quantity: 1, unitPrice: 189.00, salesAmount: 179.55, discountPct: 5,  profit: 47.80 },
  { orderId: 'ORD-1008', orderDate: '2023-05-08', customerId: 'CUST-052', customerName: 'Yuki Tanaka',      customerAge: 30, region: 'North', category: 'Electronics', productName: 'Vortex Mechanical Keyboard',   quantity: 1, unitPrice: 149.00, salesAmount: 149.00, discountPct: 0,  profit: 33.10 },
  { orderId: 'ORD-1009', orderDate: '2023-11-09', customerId: 'CUST-027', customerName: 'Liam Murphy',      customerAge: 38, region: 'East',  category: 'Apparel',    productName: 'Coastline Linen Shirt',        quantity: 4, unitPrice: 58.00,  salesAmount: 232.00, discountPct: 0,  profit: 69.80 },
  { orderId: 'ORD-1010', orderDate: '2023-11-10', customerId: 'CUST-063', customerName: 'Fatima Zahra',     customerAge: 46, region: 'West',  category: 'Home',       productName: 'Lumen LED Desk Lamp',          quantity: 2, unitPrice: 38.00,  salesAmount: 76.00,  discountPct: 0,  profit: 22.70 },
  { orderId: 'ORD-1011', orderDate: '2023-05-13', customerId: 'CUST-071', customerName: 'Noah Bergström',   customerAge: 31, region: 'North', category: 'Electronics', productName: 'Echo Portable Speaker',        quantity: 3, unitPrice: 79.99,  salesAmount: 239.97, discountPct: 0,  profit: 41.20 },
  { orderId: 'ORD-1012', orderDate: '2023-11-12', customerId: 'CUST-036', customerName: 'Isabella Romano',  customerAge: 33, region: 'East',  category: 'Apparel',    productName: 'Drift Running Shoes',          quantity: 1, unitPrice: 115.00, salesAmount: 103.50, discountPct: 10, profit: 28.90 },
  { orderId: 'ORD-1013', orderDate: '2023-11-13', customerId: 'CUST-048', customerName: 'Kwame Mensah',    customerAge: 58, region: 'South', category: 'Home',       productName: 'Terra Plant Care Kit',         quantity: 2, unitPrice: 34.50,  salesAmount: 69.00,  discountPct: 0,  profit: 20.60 },
  { orderId: 'ORD-1014', orderDate: '2023-05-14', customerId: 'CUST-055', customerName: 'Elena Petrov',    customerAge: 44, region: 'West',  category: 'Electronics', productName: 'Helix USB-C Hub',              quantity: 2, unitPrice: 54.99,  salesAmount: 109.98, discountPct: 0,  profit: 32.50 },
  { orderId: 'ORD-1015', orderDate: '2023-11-15', customerId: 'CUST-039', customerName: 'Rahul Verma',     customerAge: 36, region: 'East',  category: 'Apparel',    productName: 'Summit Down Jacket',           quantity: 1, unitPrice: 219.00, salesAmount: 186.15, discountPct: 15, profit: 48.20 },
];

export const cleaningSteps = [
  { id: 'missing', label: 'Impute missing Customer Age', count: 3, severity: 'high' as const },
  { id: 'dates', label: 'Standardize date formats to YYYY-MM-DD', count: 6, severity: 'high' as const },
  { id: 'dupes', label: 'Remove duplicate rows (same Order ID + Product)', count: 1, severity: 'medium' as const },
  { id: 'negative', label: 'Correct negative Sales Amount (returns flagged)', count: 2, severity: 'high' as const },
  { id: 'discount', label: 'Recompute Sales Amount net of discount', count: 5, severity: 'low' as const },
];

export const pandasScript = `import pandas as pd
import numpy as np

RAW_PATH = "data/raw_store_sales.csv"
CLEAN_PATH = "data/clean_store_sales.csv"

df = pd.read_csv(RAW_PATH)

# 1. Standardize date column to YYYY-MM-DD
#    Handles 2023/11-01, 02-05-2023, 11/04/2023 in one pass.
def parse_mixed_date(value):
    for fmt in ("%Y/%m-%d", "%d-%m-%Y", "%m/%d/%Y", "%Y-%m-%d"):
        try:
            return pd.to_datetime(value, format=fmt).strftime("%Y-%m-%d")
        except (ValueError, TypeError):
            continue
    return np.nan

df["order_date"] = df["order_date"].apply(parse_mixed_date)

# 2. Impute missing Customer Age with per-category median
df["customer_age"] = df["customer_age"].replace("", np.nan)
df["customer_age"] = (
    df.groupby("category")["customer_age"]
      .transform(lambda s: s.fillna(s.median()))
)

# 3. Correct negative Sales Amount (treat as data-entry sign error)
df["sales_amount"] = df["sales_amount"].abs()

# 4. Remove exact duplicates on order_id + product_name
df = df.drop_duplicates(subset=["order_id", "product_name"], keep="first")

# 5. Recompute net sales amount after discount
df["sales_amount"] = (df["quantity"] * df["unit_price"]) * (1 - df["discount"] / 100)
df["sales_amount"] = df["sales_amount"].round(2)

# 6. Assign surrogate customer keys for the warehouse
df["customer_id"] = "CUST-" + df.groupby("customer_name").ngroup().add(1).astype(str).str.zfill(3)

df.to_csv(CLEAN_PATH, index=False)
print(f"Cleaned {len(df)} rows -> {CLEAN_PATH}")`;

export const excelFormulas = [
  { cell: 'C2',  desc: 'Parse mixed date formats',  formula: '=IFERROR(TEXT(DATEVALUE(A2),"yyyy-mm-dd"), TEXT(DATE(MID(A2,1,4),MID(A2,6,2),MID(A2,9,2)),"yyyy-mm-dd"))' },
  { cell: 'D2',  desc: 'Impute age from category median', formula: '=IF(D2="", MEDIANIFS(D:D, B:B, B2), D2)' },
  { cell: 'J2',  desc: 'Flip negative sales to positive',  formula: '=ABS(J2)' },
  { cell: 'L2',  desc: 'Recompute net of discount',        formula: '=ROUND(H2*I2*(1-K2/100), 2)' },
  { cell: 'M2',  desc: 'Flag duplicate order+product',     formula: '=IF(COUNTIFS(A:A,A2,F:F,F2)>1,"DUPLICATE","OK")' },
];
