--
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;

-- Table: stocks
DROP TABLE IF EXISTS stocks;
CREATE TABLE [stocks] ([stockId] INTEGER PRIMARY KEY, [symbol] VARCHAR, [name] VARCHAR, [stockMarket] VARCHAR, [currentStockPrice] NUMERIC, [stockStickerPrice] NUMERIC, [percentageDiscount] NUMERIC, [averageRoics] NUMERIC, [averageBvpsGrowth] NUMERIC, [averageSalesGrowth] NUMERIC, [averageEpsGrowth] NUMERIC, [averageCashFlowGrowth] NUMERIC, [paybackTime] NUMERIC, [allInfoAsJson] VARCHAR, [gotSymbolFrom] VARCHAR, [dateAutomated] DATE, [dateAnalyzed] DATE);

PRAGMA foreign_keys = on;
