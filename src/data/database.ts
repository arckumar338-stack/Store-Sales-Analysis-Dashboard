export type SqlColumn = { name: string; type: string; key?: 'PK' | 'FK'; note?: string };
export type SqlTable = {
  name: string;
  kind: 'fact' | 'dimension';
  rows: number;
  desc: string;
  columns: SqlColumn[];
};

export const schemaTables: SqlTable[] = [
  {
    name: 'Fact_Sales',
    kind: 'fact',
    rows: 184320,
    desc: 'Grain: one row per order line item. Surrogate keys link to every dimension.',
    columns: [
      { name: 'sales_key',     type: 'BIGINT',        key: 'PK', note: 'Auto-increment surrogate' },
      { name: 'order_id',      type: 'VARCHAR(20)',   note: 'Natural key from source' },
      { name: 'order_date_key',type: 'INT',           key: 'FK', note: '-> Dim_Date.date_key' },
      { name: 'customer_key',  type: 'INT',           key: 'FK', note: '-> Dim_Customers.customer_key' },
      { name: 'product_key',   type: 'INT',           key: 'FK', note: '-> Dim_Products.product_key' },
      { name: 'store_key',     type: 'INT',           key: 'FK', note: '-> Dim_Stores.store_key' },
      { name: 'quantity',      type: 'SMALLINT' },
      { name: 'unit_price',    type: 'DECIMAL(10,2)' },
      { name: 'sales_amount',  type: 'DECIMAL(12,2)', note: 'Net of discount' },
      { name: 'discount_pct',  type: 'DECIMAL(5,2)' },
      { name: 'profit',        type: 'DECIMAL(12,2)' },
      { name: 'is_returned',   type: 'TINYINT(1)',    note: '0 / 1 flag' },
    ],
  },
  {
    name: 'Dim_Customers',
    kind: 'dimension',
    rows: 12480,
    desc: 'Slowly Changing Dimension Type 2. Tracks customer attribute history.',
    columns: [
      { name: 'customer_key',  type: 'INT',          key: 'PK', note: 'Surrogate' },
      { name: 'customer_id',   type: 'VARCHAR(12)',  note: 'Natural key CUST-xxx' },
      { name: 'customer_name', type: 'VARCHAR(120)' },
      { name: 'customer_age',  type: 'TINYINT' },
      { name: 'segment',       type: 'VARCHAR(20)',  note: 'Consumer / Corporate / Home Office' },
      { name: 'email',         type: 'VARCHAR(160)' },
      { name: 'effective_from',type: 'DATE' },
      { name: 'effective_to',  type: 'DATE',         note: '9999-12-31 = current' },
      { name: 'is_current',    type: 'TINYINT(1)' },
    ],
  },
  {
    name: 'Dim_Products',
    kind: 'dimension',
    rows: 842,
    desc: 'Product catalog with hierarchical category and cost basis.',
    columns: [
      { name: 'product_key',   type: 'INT',          key: 'PK', note: 'Surrogate' },
      { name: 'product_id',    type: 'VARCHAR(12)',  note: 'Natural key SKU' },
      { name: 'product_name',  type: 'VARCHAR(160)' },
      { name: 'category',      type: 'VARCHAR(40)',  note: 'Electronics / Apparel / Home' },
      { name: 'subcategory',   type: 'VARCHAR(40)' },
      { name: 'unit_cost',     type: 'DECIMAL(10,2)' },
      { name: 'unit_price',    type: 'DECIMAL(10,2)' },
      { name: 'is_active',     type: 'TINYINT(1)' },
    ],
  },
  {
    name: 'Dim_Stores',
    kind: 'dimension',
    rows: 18,
    desc: 'Physical store locations mapped to sales regions.',
    columns: [
      { name: 'store_key',   type: 'INT',         key: 'PK', note: 'Surrogate' },
      { name: 'store_id',    type: 'VARCHAR(8)',  note: 'Natural key STR-xx' },
      { name: 'store_name',  type: 'VARCHAR(120)' },
      { name: 'region',      type: 'VARCHAR(20)', note: 'North / South / East / West' },
      { name: 'city',        type: 'VARCHAR(80)' },
      { name: 'state',       type: 'VARCHAR(40)' },
      { name: 'opened_on',   type: 'DATE' },
    ],
  },
  {
    name: 'Dim_Date',
    kind: 'dimension',
    rows: 1096,
    desc: 'Calendar dimension covering 2021-01-01 to 2023-12-31.',
    columns: [
      { name: 'date_key',    type: 'INT',         key: 'PK', note: 'YYYYMMDD int' },
      { name: 'full_date',   type: 'DATE' },
      { name: 'day_of_week', type: 'VARCHAR(12)' },
      { name: 'month_name',  type: 'VARCHAR(12)' },
      { name: 'quarter',     type: 'TINYINT' },
      { name: 'year',        type: 'SMALLINT' },
      { name: 'is_weekend',  type: 'TINYINT(1)' },
    ],
  },
];

export type SqlQuery = {
  id: string;
  title: string;
  question: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  sql: string;
  columns: string[];
  rows: (string | number)[][];
};

export const sqlQueries: SqlQuery[] = [
  {
    id: 'q1',
    title: 'Top 5 Products by Profit Margin',
    question: 'Which five products deliver the highest profit margin, and what share of total profit do they represent?',
    difficulty: 'Basic',
    sql: `SELECT
    p.product_name,
    p.category,
    SUM(f.sales_amount)          AS total_revenue,
    SUM(f.profit)                AS total_profit,
    ROUND(SUM(f.profit) / SUM(f.sales_amount) * 100, 2) AS profit_margin_pct
FROM Fact_Sales f
JOIN Dim_Products p  ON p.product_key = f.product_key
WHERE f.is_returned = 0
GROUP BY p.product_name, p.category
ORDER BY profit_margin_pct DESC
LIMIT 5;`,
    columns: ['Product', 'Category', 'Revenue', 'Profit', 'Margin %'],
    rows: [
      ['Nimbus Aromatherapy Diffuser', 'Home',       '$48,210', '$14,463', 30.0],
      ['Terra Plant Care Kit',         'Home',       '$31,050', '$  9,270', 29.9],
      ['Summit Down Jacket',           'Apparel',    '$98,640', '$26,634', 27.0],
      ['Vortex Mechanical Keyboard',   'Electronics','$67,050', '$16,763', 25.0],
      ['Drift Running Shoes',          'Apparel',    '$51,750', '$12,420', 24.0],
    ],
  },
  {
    id: 'q2',
    title: 'Monthly Sales Growth Percentage',
    question: 'How has month-over-month net sales grown across the last 8 months of 2023?',
    difficulty: 'Intermediate',
    sql: `WITH monthly AS (
    SELECT
        d.year,
        d.month_name,
        SUM(f.sales_amount) AS net_sales
    FROM Fact_Sales f
    JOIN Dim_Date d ON d.date_key = f.order_date_key
    WHERE d.year = 2023 AND f.is_returned = 0
    GROUP BY d.year, d.month_name
),
lagged AS (
    SELECT
        month_name,
        net_sales,
        LAG(net_sales) OVER (ORDER BY year, month_name) AS prev_sales
    FROM monthly
)
SELECT
    month_name,
    net_sales,
    prev_sales,
    ROUND((net_sales - prev_sales) / prev_sales * 100, 2) AS mom_growth_pct
FROM lagged
WHERE prev_sales IS NOT NULL
ORDER BY month_name;`,
    columns: ['Month', 'Net Sales', 'Prev Month', 'MoM Growth'],
    rows: [
      ['May',     '$142,300', '$128,900', '+10.4%'],
      ['Jun',     '$156,780', '$142,300', '+10.2%'],
      ['Jul',     '$149,210', '$156,780', '-4.8%'],
      ['Aug',     '$168,540', '$149,210', '+12.9%'],
      ['Sep',     '$175,920', '$168,540', '+4.4%'],
      ['Oct',     '$192,380', '$175,920', '+9.4%'],
      ['Nov',     '$218,640', '$192,380', '+13.6%'],
      ['Dec',     '$241,070', '$218,640', '+10.3%'],
    ],
  },
  {
    id: 'q3',
    title: 'Dormant High-Value Customers (60+ days)',
    question: 'Which high-value customers (lifetime value above $5,000) have not placed an order in the last 60 days?',
    difficulty: 'Advanced',
    sql: `WITH customer_ltv AS (
    SELECT
        c.customer_key,
        c.customer_name,
        c.segment,
        SUM(f.sales_amount) AS lifetime_value,
        MAX(d.full_date)    AS last_order_date
    FROM Fact_Sales f
    JOIN Dim_Customers c ON c.customer_key = f.customer_key
    JOIN Dim_Date      d ON d.date_key = f.order_date_key
    WHERE f.is_returned = 0
    GROUP BY c.customer_key, c.customer_name, c.segment
)
SELECT
    customer_name,
    segment,
    lifetime_value,
    last_order_date,
    DATEDIFF(CURRENT_DATE, last_order_date) AS days_dormant
FROM customer_ltv
WHERE lifetime_value > 5000
  AND DATEDIFF(CURRENT_DATE, last_order_date) > 60
ORDER BY lifetime_value DESC
LIMIT 6;`,
    columns: ['Customer', 'Segment', 'Lifetime Value', 'Last Order', 'Days Dormant'],
    rows: [
      ['Sarah Chen',        'Corporate',   '$ 7,840', '2023-09-12', 98],
      ['Amara Okafor',      'Consumer',    '$ 6,520', '2023-09-28', 82],
      ['Liam Murphy',       'Home Office', '$ 5,910', '2023-10-04', 76],
      ['Diego Santos',      'Consumer',    '$ 5,680', '2023-10-11', 69],
      ['Isabella Romano',   'Corporate',   '$ 5,430', '2023-10-15', 65],
      ['Rahul Verma',       'Home Office', '$ 5,210', '2023-10-19', 61],
    ],
  },
  {
    id: 'q4',
    title: 'Regional Category Mix',
    question: 'What is the revenue split by category within each region for 2023?',
    difficulty: 'Basic',
    sql: `SELECT
    s.region,
    p.category,
    ROUND(SUM(f.sales_amount), 0) AS revenue,
    ROUND(SUM(f.profit), 0)       AS profit
FROM Fact_Sales f
JOIN Dim_Stores   s ON s.store_key   = f.store_key
JOIN Dim_Products p ON p.product_key = f.product_key
JOIN Dim_Date     d ON d.date_key    = f.order_date_key
WHERE d.year = 2023 AND f.is_returned = 0
GROUP BY s.region, p.category
ORDER BY s.region, revenue DESC;`,
    columns: ['Region', 'Category', 'Revenue', 'Profit'],
    rows: [
      ['East',  'Electronics', '$58,420', '$14,180'],
      ['East',  'Apparel',     '$41,310', '$10,840'],
      ['East',  'Home',        '$29,870', '$ 8,420'],
      ['West',  'Electronics', '$67,910', '$16,540'],
      ['West',  'Apparel',     '$52,180', '$13,920'],
      ['West',  'Home',        '$33,640', '$ 9,780'],
      ['North', 'Electronics', '$44,720', '$10,980'],
      ['North', 'Apparel',     '$37,560', '$ 9,840'],
      ['North', 'Home',        '$26,140', '$ 7,420'],
      ['South', 'Electronics', '$51,260', '$12,640'],
      ['South', 'Apparel',     '$38,920', '$10,210'],
      ['South', 'Home',        '$28,470', '$ 8,060'],
    ],
  },
];
