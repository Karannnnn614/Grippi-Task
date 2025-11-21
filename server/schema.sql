DROP TABLE IF EXISTS campaigns;

CREATE TABLE campaigns (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    clicks INTEGER DEFAULT 0,
    cost FLOAT DEFAULT 0.0,
    impressions INTEGER DEFAULT 0
);

INSERT INTO campaigns (id, name, status, clicks, cost, impressions) VALUES
(1, 'Summer Sale Campaign', 'active', 1500, 250.50, 50000),
(2, 'Black Friday Promo', 'completed', 3200, 500.00, 80000),
(3, 'New Year Special', 'active', 2100, 350.75, 65000),
(4, 'Spring Collection Launch', 'paused', 800, 150.00, 30000),
(5, 'Back to School Sale', 'active', 1900, 300.25, 55000),
(6, 'Holiday Gift Guide', 'completed', 2800, 450.00, 70000),
(7, 'Weekend Flash Sale', 'active', 1200, 200.00, 40000),
(8, 'Clearance Event', 'paused', 600, 100.50, 20000),
(9, 'Valentine\'s Day Special', 'completed', 2500, 400.00, 60000),
(10, 'Product Launch Campaign', 'active', 1750, 280.00, 48000);

SELECT * FROM campaigns;