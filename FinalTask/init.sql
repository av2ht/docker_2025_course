-- Drop database if exists (MySQL equivalent of schema)
DROP DATABASE IF EXISTS ai_tools_catalog;

-- Create the database
CREATE DATABASE ai_tools_catalog;

-- Select the database for use
USE ai_tools_catalog;

-- Create the ai_tools table
CREATE TABLE ai_tools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year_published INT,
    cost_usd_per_month DECIMAL(10,2),
    average_monthly_users INT,
    CHECK (year_published >= 1950 AND year_published <= YEAR(CURDATE())),
    CHECK (cost_usd_per_month >= 0),
    CHECK (average_monthly_users >= 0)
);

-- Insert sample data into ai_tools
INSERT INTO ai_tools (name, year_published, cost_usd_per_month, average_monthly_users)
VALUES
    ('ChatGPT', 2022, 20.00, 100000000),
    ('Midjourney', 2022, 30.00, 1500000),
    ('DALL·E', 2021, 15.00, 1200000),
    ('Notion AI', 2023, 10.00, 2500000),
    ('GitHub Copilot', 2021, 10.00, 2000000),
    ('Jasper AI', 2021, 49.00, 500000),
    ('Perplexity AI', 2023, 0.00, 2000000),
    ('Synthesia', 2020, 30.00, 350000),
    ('Runway ML', 2021, 12.00, 700000),
    ('Claude (Anthropic)', 2023, 0.00, 3000000);
