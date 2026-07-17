export const edaSnippets = [
  {
    id: 'corr',
    title: 'Correlation Matrix',
    desc: 'Quantify linear relationships between price, quantity, discount, and profit.',
    code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("data/clean_store_sales.csv")

num_cols = ["unit_price", "quantity", "discount_pct", "sales_amount", "profit"]
corr = df[num_cols].corr()

plt.figure(figsize=(8, 6))
sns.heatmap(
    corr,
    annot=True,
    fmt=".2f",
    cmap="viridis",
    square=True,
    cbar_kws={"shrink": 0.8},
)
plt.title("Correlation Matrix - Numeric Features")
plt.tight_layout()
plt.show()`,
  },
  {
    id: 'dist',
    title: 'Order Value Distribution',
    desc: 'Histogram with kernel density estimate to inspect skew in order totals.',
    code: `plt.figure(figsize=(9, 5))
sns.histplot(
    df["sales_amount"],
    bins=30,
    kde=True,
    color="#2dd4b7",
    edgecolor="#0c0e14",
)
plt.axvline(df["sales_amount"].mean(), color="#fbbf24",
            linestyle="--", label=f"Mean \${{df['sales_amount'].mean():.0f}}")
plt.title("Distribution of Order Values")
plt.xlabel("Order Value (USD)")
plt.ylabel("Frequency")
plt.legend()
plt.tight_layout()
plt.show()`,
  },
  {
    id: 'box',
    title: 'Sales Outlier Detection',
    desc: 'Box plots per category surface outliers beyond the 1.5 IQR fences.',
    code: `plt.figure(figsize=(9, 5))
sns.boxplot(
    data=df,
    x="category",
    y="sales_amount",
    palette="Set2",
    fliersize=4,
)
plt.title("Sales Amount by Category - Outlier Detection")
plt.xlabel("Category")
plt.ylabel("Sales Amount (USD)")
plt.tight_layout()
plt.show()`,
  },
];

// Correlation matrix values (lower-triangle symmetric)
export const correlationMatrix = {
  labels: ['Unit Price', 'Quantity', 'Discount', 'Sales Amt', 'Profit'],
  values: [
    [1.00,  0.18, -0.04,  0.62,  0.55],
    [0.18,  1.00, -0.11,  0.41,  0.33],
    [-0.04, -0.11, 1.00, -0.28, -0.22],
    [0.62,  0.41, -0.28,  1.00,  0.78],
    [0.55,  0.33, -0.22,  0.78,  1.00],
  ],
};

// Order value distribution: bins -> frequency
export const orderDistribution = [
  { bin: '0-50',    count: 412 },
  { bin: '51-100',  count: 689 },
  { bin: '101-150', count: 824 },
  { bin: '151-200', count: 961 },
  { bin: '201-250', count: 743 },
  { bin: '251-300', count: 512 },
  { bin: '301-350', count: 318 },
  { bin: '351-400', count: 197 },
  { bin: '401-450', count: 124 },
  { bin: '451-500', count:  68 },
];

export const boxPlotData = {
  categories: ['Electronics', 'Apparel', 'Home'],
  stats: [
    { min: 24, q1: 89,  median: 149, q3: 219, max: 312, outliers: [438, 472] },
    { min: 18, q1: 58,  median: 102, q3: 168, max: 240, outliers: [372] },
    { min: 22, q1: 42,  median: 76,  q3: 138, max: 198, outliers: [269, 287] },
  ],
};
