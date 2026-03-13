-- ============================================================
-- Singapore Hawker Centre Map - Supabase Schema & Seed Data
-- ============================================================

-- Create the hawker_centres table
CREATE TABLE IF NOT EXISTS hawker_centres (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  postal_code TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  region TEXT,
  num_stalls INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (allow public read access)
ALTER TABLE hawker_centres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON hawker_centres
  FOR SELECT
  TO anon
  USING (true);

-- Seed data: Singapore hawker centres with coordinates and regions
INSERT INTO hawker_centres (name, address, postal_code, latitude, longitude, region, num_stalls) VALUES
  ('Maxwell Food Centre', '1 Kadayanallur Street', '069184', 1.2804, 103.8448, 'Central', 100),
  ('Lau Pa Sat Festival Market', '18 Raffles Quay', '048582', 1.2804, 103.8505, 'Central', 78),
  ('Chinatown Complex Food Centre', '335 Smith Street', '050335', 1.2825, 103.8428, 'Central', 260),
  ('Hong Lim Market & Food Centre', '531A Upper Cross Street', '051531', 1.2853, 103.8449, 'Central', 107),
  ('Amoy Street Food Centre', '7 Maxwell Road', '069111', 1.2799, 103.8464, 'Central', 100),
  ('Golden Mile Food Centre', '505 Beach Road', '199583', 1.3027, 103.8635, 'Central', 55),
  ('Albert Centre Market & Food Centre', '270 Queen Street', '180270', 1.3021, 103.8555, 'Central', 98),
  ('Tekka Centre', '665 Buffalo Road', '210665', 1.3065, 103.8500, 'Central', 50),
  ('Zion Riverside Food Centre', '70 Zion Road', '247792', 1.2917, 103.8306, 'Central', 33),
  ('ABC Brickworks Market & Food Centre', '6 Jalan Bukit Merah', '150006', 1.2738, 103.8173, 'Central', 78),
  ('Tiong Bahru Market', '30 Seng Poh Road', '168898', 1.2850, 103.8323, 'Central', 83),
  ('People''s Park Food Centre', '32 New Market Road', '050032', 1.2837, 103.8428, 'Central', 60),
  ('Whampoa Makan Place (Blk 90)', '90 Whampoa Drive', '320090', 1.3225, 103.8558, 'Central', 45),
  ('Berseh Food Centre', '166 Jalan Besar', '208877', 1.3098, 103.8577, 'Central', 37),
  ('Old Airport Road Food Centre', '51 Old Airport Road', '390051', 1.3138, 103.8832, 'East', 168),
  ('East Coast Lagoon Food Village', '1220 East Coast Parkway', '468960', 1.3042, 103.9342, 'East', 49),
  ('Bedok Interchange Hawker Centre', '208B New Upper Changi Road', '462208', 1.3236, 103.9300, 'East', 44),
  ('Dunman Food Centre', '271 Onan Road', '424768', 1.3110, 103.9025, 'East', 22),
  ('Changi Village Hawker Centre', '2 Changi Village Road', '500002', 1.3891, 103.9875, 'East', 55),
  ('Geylang Serai Market', '1 Geylang Serai', '402001', 1.3167, 103.8984, 'East', 72),
  ('Haig Road Market & Food Centre', '14 Haig Road', '430014', 1.3120, 103.8967, 'East', 38),
  ('Marine Parade Central Market & Food Centre', '84 Marine Parade Central', '440084', 1.3030, 103.9060, 'East', 52),
  ('Blk 16 Bedok South Road Market & Food Centre', '16 Bedok South Road', '460016', 1.3215, 103.9430, 'East', 36),
  ('Tampines Round Market & Food Centre', '137 Tampines Street 11', '521137', 1.3453, 103.9447, 'East', 35),
  ('Tampines Mall Hawker Centre', '4 Tampines Central 5', '529510', 1.3535, 103.9454, 'East', 42),
  ('Pasir Ris Central Hawker Centre', '110 Pasir Ris Central', '519641', 1.3733, 103.9512, 'East', 38),
  ('Chomp Chomp Food Centre', '20 Kensington Park Road', '557269', 1.3631, 103.8665, 'North-East', 32),
  ('Serangoon Garden Market & Food Centre', '49A Serangoon Garden Way', '555945', 1.3619, 103.8664, 'North-East', 48),
  ('Toa Payoh Lorong 8 Market & Hawker Centre', '210 Toa Payoh Lorong 8', '310210', 1.3405, 103.8504, 'Central', 56),
  ('Kim San Leng Food Centre (Bishan)', '511 Bishan Street 13', '570511', 1.3502, 103.8491, 'Central', 30),
  ('Ang Mo Kio Avenue 1 Market & Food Centre', '226H Ang Mo Kio Avenue 1', '568226', 1.3710, 103.8485, 'North-East', 27),
  ('Hougang Avenue 1 Hawker Centre', '105 Hougang Avenue 1', '530105', 1.3578, 103.8918, 'North-East', 30),
  ('Ci Yuan Hawker Centre', '51 Hougang Avenue 9', '538776', 1.3519, 103.8928, 'North-East', 42),
  ('Kovan Hougang Market & Food Centre', '209 Hougang Street 21', '530209', 1.3608, 103.8842, 'North-East', 30),
  ('Punggol Plaza Hawker Centre', '168 Punggol Field', '820168', 1.3978, 103.9065, 'North-East', 28),
  ('Buangkok Hawker Centre', '17 Buangkok Green', '539747', 1.3834, 103.8855, 'North-East', 42),
  ('Yishun Park Hawker Centre', '51 Yishun Avenue 11', '768867', 1.4265, 103.8453, 'North', 43),
  ('Chong Pang Market & Food Centre', '105 Yishun Ring Road', '760105', 1.4295, 103.8300, 'North', 36),
  ('Sembawang Hills Food Centre', '590 Upper Thomson Road', '574419', 1.3790, 103.8342, 'North', 50),
  ('Woodlands Hawker Centre', '30 Marsiling Drive', '739110', 1.4453, 103.7740, 'North', 50),
  ('Admiralty Place Hawker Centre', '678A Woodlands Avenue 6', '731678', 1.4405, 103.8000, 'North', 28),
  ('Marsiling Mall Hawker Centre', '4 Woodlands Street 12', '738608', 1.4406, 103.7740, 'North', 38),
  ('Jurong West 505 Market & Food Centre', '505 Jurong West Street 52', '640505', 1.3506, 103.7187, 'West', 54),
  ('Yuhua Market & Hawker Centre', '254 Jurong East Street 24', '600254', 1.3449, 103.7337, 'West', 42),
  ('Taman Jurong Market & Food Centre', '3 Taman Jurong', '600003', 1.3356, 103.7225, 'West', 57),
  ('Clementi 448 Market & Food Centre', '448 Clementi Avenue 3', '120448', 1.3140, 103.7651, 'West', 47),
  ('West Coast Market Square', '502 West Coast Drive', '120502', 1.3037, 103.7657, 'West', 46),
  ('Bukit Timah Market & Food Centre', '51 Upper Bukit Timah Road', '588215', 1.3394, 103.7766, 'West', 50),
  ('Adam Road Food Centre', '2 Adam Road', '289876', 1.3236, 103.8136, 'Central', 25),
  ('Commonwealth Crescent Market & Food Centre', '31 Commonwealth Crescent', '149644', 1.3046, 103.7975, 'Central', 22),
  ('Bukit Merah View Market & Hawker Centre', '115 Bukit Merah View', '151115', 1.2853, 103.8153, 'Central', 70),
  ('Redhill Market & Food Centre', '79 Redhill Lane', '150079', 1.2878, 103.8168, 'Central', 32),
  ('Holland Drive Market & Food Centre', '44 Holland Drive', '270044', 1.3073, 103.7868, 'West', 26),
  ('Ghim Moh Market & Food Centre', '20 Ghim Moh Road', '270020', 1.3112, 103.7889, 'West', 35),
  ('Ayer Rajah Food Centre', '503 West Coast Drive', '120503', 1.3034, 103.7664, 'West', 28),
  ('Beo Crescent Market & Food Centre', '38A Beo Crescent', '160038', 1.2884, 103.8284, 'Central', 30),
  ('Blk 75 Toa Payoh Lorong 5 Hawker Centre', '75 Toa Payoh Lorong 5', '310075', 1.3360, 103.8512, 'Central', 32),
  ('Newton Food Centre', '500 Clemenceau Avenue North', '229495', 1.3119, 103.8393, 'Central', 94),
  ('Bedok South Market & Food Centre', '16 Bedok South Road', '460016', 1.3216, 103.9432, 'East', 36),
  ('Kampung Admiralty Hawker Centre', '676 Woodlands Drive 71', '730676', 1.4395, 103.8005, 'North', 40),
  ('Pasir Panjang Food Centre', '121 Pasir Panjang Road', '118543', 1.2762, 103.7927, 'West', 36),
  ('Telok Blangah Crescent Market & Food Centre', '11 Telok Blangah Crescent', '090011', 1.2718, 103.8090, 'Central', 34),
  ('Alexandra Village Food Centre', '120 Bukit Merah Lane 1', '150120', 1.2875, 103.8015, 'Central', 56),
  ('Blk 4A Jalan Batu Hawker Centre', '4A Jalan Batu', '431004', 1.3078, 103.8761, 'East', 30),
  ('Blk 51 Old Airport Road Food Centre', '51 Old Airport Road', '390051', 1.3138, 103.8832, 'East', 168),
  ('Havelock Road Cooked Food Centre', '22A Havelock Road', '162022', 1.2895, 103.8345, 'Central', 28),
  ('Market Street Interim Hawker Centre', '31 Market Street', '048942', 1.2841, 103.8506, 'Central', 35),
  ('Blk 505 Jurong West Hawker Centre', '505 Jurong West Street 52', '640505', 1.3506, 103.7187, 'West', 54),
  ('Bukit Panjang Hawker Centre', '259 Bukit Panjang Ring Road', '670259', 1.3809, 103.7641, 'West', 42),
  ('Sengkang 628 Hawker Centre', '628C Sengkang Central', '544628', 1.3914, 103.8924, 'North-East', 36),
  ('Anchorvale Village Hawker Centre', '308C Anchorvale Road', '544308', 1.3939, 103.8867, 'North-East', 32),
  ('Fernvale Hawker Centre', '433A Fernvale Road', '791433', 1.3922, 103.8763, 'North-East', 34),
  ('Jurong East Hawker Centre', '347 Jurong East Avenue 1', '600347', 1.3476, 103.7382, 'West', 38),
  ('Choa Chu Kang Market & Food Centre', '6 Choa Chu Kang Avenue 3', '689816', 1.3848, 103.7447, 'West', 36),
  ('Blk 115 Bukit Merah View Hawker Centre', '115 Bukit Merah View', '151115', 1.2853, 103.8153, 'Central', 70),
  ('Queenstown Leng Kee Market', '49 Lengkok Bahru', '151049', 1.2895, 103.8069, 'Central', 26),
  ('Margaret Drive Hawker Centre', '38A Margaret Drive', '149300', 1.2978, 103.7992, 'Central', 44),
  ('Toa Payoh West Market & Food Court', '127 Toa Payoh Lorong 1', '310127', 1.3364, 103.8427, 'Central', 38),
  ('Bendemeer Market & Food Centre', '29 Bendemeer Road', '330029', 1.3171, 103.8633, 'Central', 44),
  ('Circuit Road Hawker Centre', '79A Circuit Road', '371079', 1.3258, 103.8856, 'East', 36),
  ('Blk 341 Ang Mo Kio Ave 1', '341 Ang Mo Kio Avenue 1', '560341', 1.3697, 103.8491, 'North-East', 36);
