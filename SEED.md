# Database Seed Data

Run these SQL statements in your Supabase SQL Editor to populate your database.

---

## 1. Metals

```sql
INSERT INTO metals (id, symbol, name, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Ga', 'Gallium', 'Critical for semiconductors, LEDs, and solar cells'),
('22222222-2222-2222-2222-222222222222', 'Nd', 'Neodymium', 'Essential for permanent magnets in EVs and wind turbines'),
('33333333-3333-3333-3333-333333333333', 'Co', 'Cobalt', 'Key component in lithium-ion batteries'),
('44444444-4444-4444-4444-444444444444', 'Li', 'Lithium', 'Primary material for EV and grid storage batteries'),
('55555555-5555-5555-5555-555555555555', 'W', 'Tungsten', 'Critical for defense, aerospace, and industrial tooling'),
('66666666-6666-6666-6666-666666666666', 'Si', 'Silicon', 'Essential for semiconductors, solar panels, and electronics'),
('77777777-7777-7777-7777-777777777777', 'Cu', 'Copper', 'Critical for electrical wiring, EVs, and renewable energy infrastructure'),
('88888888-8888-8888-8888-888888888888', 'Fe', 'Iron', 'Base material for steel production across all industries'),
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'Ge', 'Germanium', 'Critical for fiber optics, infrared optics, and semiconductors'),
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'In', 'Indium', 'Essential for LCD screens, touchscreens, and solar cells'),
('7cb13245-6987-4475-a6e6-f73e355a868e', 'Ni', 'Nickel', 'Key for stainless steel and EV battery cathodes'),
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'Mn', 'Manganese', 'Critical for steel production and battery cathodes'),
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'Dy', 'Dysprosium', 'Rare earth for high-temperature permanent magnets'),
('dc5d2db4-9804-41da-8edb-22bcada54506', 'Tb', 'Terbium', 'Rare earth for green phosphors and permanent magnets'),
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'Mo', 'Molybdenum', 'Essential for high-strength steel alloys and catalysts');
```

---

## 2. Country Supply

```sql
-- Gallium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('11111111-1111-1111-1111-111111111111', 'China', 'CN', 98.00, 2024),
('11111111-1111-1111-1111-111111111111', 'Japan', 'JP', 1.00, 2024),
('11111111-1111-1111-1111-111111111111', 'South Korea', 'KR', 0.50, 2024);

-- Neodymium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('22222222-2222-2222-2222-222222222222', 'China', 'CN', 70.00, 2024),
('22222222-2222-2222-2222-222222222222', 'Myanmar', 'MM', 12.00, 2024),
('22222222-2222-2222-2222-222222222222', 'Australia', 'AU', 8.00, 2024),
('22222222-2222-2222-2222-222222222222', 'United States', 'US', 5.00, 2024);

-- Cobalt
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('33333333-3333-3333-3333-333333333333', 'DR Congo', 'CD', 73.00, 2024),
('33333333-3333-3333-3333-333333333333', 'Russia', 'RU', 5.00, 2024),
('33333333-3333-3333-3333-333333333333', 'Australia', 'AU', 4.00, 2024),
('33333333-3333-3333-3333-333333333333', 'Philippines', 'PH', 3.00, 2024);

-- Lithium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('44444444-4444-4444-4444-444444444444', 'Australia', 'AU', 47.00, 2024),
('44444444-4444-4444-4444-444444444444', 'Chile', 'CL', 30.00, 2024),
('44444444-4444-4444-4444-444444444444', 'China', 'CN', 15.00, 2024),
('44444444-4444-4444-4444-444444444444', 'Argentina', 'AR', 5.00, 2024);

-- Tungsten
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('55555555-5555-5555-5555-555555555555', 'China', 'CN', 84.00, 2024),
('55555555-5555-5555-5555-555555555555', 'Vietnam', 'VN', 5.00, 2024),
('55555555-5555-5555-5555-555555555555', 'Russia', 'RU', 4.00, 2024),
('55555555-5555-5555-5555-555555555555', 'Bolivia', 'BO', 2.00, 2024);

-- Silicon
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('66666666-6666-6666-6666-666666666666', 'China', 'CN', 79.00, 2024),
('66666666-6666-6666-6666-666666666666', 'Russia', 'RU', 4.00, 2024),
('66666666-6666-6666-6666-666666666666', 'Norway', 'NO', 3.00, 2024),
('66666666-6666-6666-6666-666666666666', 'United States', 'US', 3.00, 2024);

-- Copper
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('77777777-7777-7777-7777-777777777777', 'Chile', 'CL', 27.00, 2024),
('77777777-7777-7777-7777-777777777777', 'Peru', 'PE', 10.00, 2024),
('77777777-7777-7777-7777-777777777777', 'China', 'CN', 8.00, 2024),
('77777777-7777-7777-7777-777777777777', 'DR Congo', 'CD', 8.00, 2024);

-- Iron
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('88888888-8888-8888-8888-888888888888', 'Australia', 'AU', 38.00, 2024),
('88888888-8888-8888-8888-888888888888', 'Brazil', 'BR', 17.00, 2024),
('88888888-8888-8888-8888-888888888888', 'China', 'CN', 14.00, 2024),
('88888888-8888-8888-8888-888888888888', 'India', 'IN', 9.00, 2024);

-- Germanium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'China', 'CN', 60.00, 2024),
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'Russia', 'RU', 5.00, 2024),
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'United States', 'US', 3.00, 2024);

-- Indium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'China', 'CN', 57.00, 2024),
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'South Korea', 'KR', 15.00, 2024),
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'Japan', 'JP', 10.00, 2024);

-- Nickel
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('7cb13245-6987-4475-a6e6-f73e355a868e', 'Indonesia', 'ID', 48.00, 2024),
('7cb13245-6987-4475-a6e6-f73e355a868e', 'Philippines', 'PH', 10.00, 2024),
('7cb13245-6987-4475-a6e6-f73e355a868e', 'Russia', 'RU', 6.00, 2024),
('7cb13245-6987-4475-a6e6-f73e355a868e', 'New Caledonia', 'NC', 6.00, 2024);

-- Manganese
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'South Africa', 'ZA', 37.00, 2024),
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'Gabon', 'GA', 18.00, 2024),
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'Australia', 'AU', 17.00, 2024),
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'China', 'CN', 7.00, 2024);

-- Dysprosium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'China', 'CN', 90.00, 2024),
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'Australia', 'AU', 4.00, 2024),
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'Myanmar', 'MM', 3.00, 2024);

-- Terbium
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('dc5d2db4-9804-41da-8edb-22bcada54506', 'China', 'CN', 90.00, 2024),
('dc5d2db4-9804-41da-8edb-22bcada54506', 'Myanmar', 'MM', 5.00, 2024),
('dc5d2db4-9804-41da-8edb-22bcada54506', 'Australia', 'AU', 3.00, 2024);

-- Molybdenum
INSERT INTO country_supply (metal_id, country_name, country_code, percent_control, year) VALUES
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'China', 'CN', 44.00, 2024),
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'Chile', 'CL', 18.00, 2024),
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'United States', 'US', 12.00, 2024),
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'Peru', 'PE', 10.00, 2024);
```

---

## 3. Industry Dependency

```sql
-- Gallium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('11111111-1111-1111-1111-111111111111', 'semiconductors', 5, 'Essential for GaAs chips, 5G, radar systems'),
('11111111-1111-1111-1111-111111111111', 'defense', 4, 'Critical for military radar and communications'),
('11111111-1111-1111-1111-111111111111', 'renewables', 3, 'Used in thin-film solar cells'),
('11111111-1111-1111-1111-111111111111', 'evs', 2, 'Limited use in power electronics');

-- Neodymium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('22222222-2222-2222-2222-222222222222', 'renewables', 5, 'Wind turbine generators'),
('22222222-2222-2222-2222-222222222222', 'evs', 5, 'Core material for EV motors'),
('22222222-2222-2222-2222-222222222222', 'defense', 4, 'Precision-guided munitions, military vehicles'),
('22222222-2222-2222-2222-222222222222', 'semiconductors', 1, 'Minimal direct use');

-- Cobalt
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('33333333-3333-3333-3333-333333333333', 'evs', 5, 'Essential for Li-ion battery cathodes'),
('33333333-3333-3333-3333-333333333333', 'renewables', 4, 'Grid storage batteries'),
('33333333-3333-3333-3333-333333333333', 'defense', 3, 'Superalloys for jet engines'),
('33333333-3333-3333-3333-333333333333', 'semiconductors', 1, 'Limited applications');

-- Lithium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('44444444-4444-4444-4444-444444444444', 'renewables', 5, 'Grid-scale energy storage'),
('44444444-4444-4444-4444-444444444444', 'evs', 5, 'Fundamental to all EV batteries'),
('44444444-4444-4444-4444-444444444444', 'defense', 2, 'Some military applications'),
('44444444-4444-4444-4444-444444444444', 'semiconductors', 1, 'Minimal use');

-- Tungsten
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('55555555-5555-5555-5555-555555555555', 'defense', 5, 'Armor-piercing munitions, aerospace'),
('55555555-5555-5555-5555-555555555555', 'semiconductors', 4, 'Interconnects in advanced chips'),
('55555555-5555-5555-5555-555555555555', 'evs', 2, 'Some cutting tool applications'),
('55555555-5555-5555-5555-555555555555', 'renewables', 2, 'Limited use');

-- Silicon
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('66666666-6666-6666-6666-666666666666', 'semiconductors', 5, 'Foundational material for all chips'),
('66666666-6666-6666-6666-666666666666', 'renewables', 5, 'Solar panel cells'),
('66666666-6666-6666-6666-666666666666', 'evs', 3, 'Power electronics'),
('66666666-6666-6666-6666-666666666666', 'defense', 3, 'Electronics in weapons systems');

-- Copper
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('77777777-7777-7777-7777-777777777777', 'renewables', 5, 'Wind, solar, and grid infrastructure'),
('77777777-7777-7777-7777-777777777777', 'evs', 5, 'Wiring and motors in EVs'),
('77777777-7777-7777-7777-777777777777', 'semiconductors', 3, 'Interconnects and packaging'),
('77777777-7777-7777-7777-777777777777', 'defense', 3, 'Communications and electronics');

-- Iron
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('88888888-8888-8888-8888-888888888888', 'defense', 5, 'Steel for vehicles, ships, and weapons'),
('88888888-8888-8888-8888-888888888888', 'renewables', 4, 'Steel for wind turbine towers and frames'),
('88888888-8888-8888-8888-888888888888', 'evs', 3, 'Vehicle frames and components'),
('88888888-8888-8888-8888-888888888888', 'semiconductors', 1, 'Minimal direct use');

-- Germanium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'semiconductors', 5, 'Fiber optics and infrared optics'),
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'defense', 5, 'Night vision and thermal imaging'),
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'renewables', 3, 'High-efficiency solar cells');

-- Indium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'semiconductors', 5, 'ITO for displays and touchscreens'),
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'renewables', 4, 'CIGS thin-film solar cells'),
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'evs', 2, 'Display screens in vehicles');

-- Nickel
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('7cb13245-6987-4475-a6e6-f73e355a868e', 'evs', 5, 'NMC and NCA battery cathodes'),
('7cb13245-6987-4475-a6e6-f73e355a868e', 'renewables', 4, 'Grid storage batteries'),
('7cb13245-6987-4475-a6e6-f73e355a868e', 'defense', 3, 'Superalloys for aerospace');

-- Manganese
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'evs', 4, 'NMC and LMO cathode chemistries'),
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'renewables', 3, 'Grid-scale battery storage');

-- Dysprosium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'evs', 5, 'Maintains magnet strength in EV motors at high temps'),
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'renewables', 5, 'High-temp magnets for wind turbine generators'),
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'defense', 4, 'Precision-guided munitions and military equipment');

-- Terbium
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('dc5d2db4-9804-41da-8edb-22bcada54506', 'renewables', 5, 'High-performance permanent magnets'),
('dc5d2db4-9804-41da-8edb-22bcada54506', 'evs', 4, 'Magnet dopant for high-temp stability'),
('dc5d2db4-9804-41da-8edb-22bcada54506', 'defense', 4, 'Sonar systems and guidance systems');

-- Molybdenum
INSERT INTO industry_dependency (metal_id, industry, dependency_score, rationale) VALUES
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'defense', 4, 'Superalloys for aerospace and armor applications'),
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'renewables', 3, 'Catalysts for hydrogen production');
```

---

## 4. Choke Points

```sql
-- Gallium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('11111111-1111-1111-1111-111111111111', 'CN', 'export_control', 'China export controls on gallium effective Aug 2023. Requires government approval for exports.', 5, true),
('11111111-1111-1111-1111-111111111111', 'CN', 'refining', 'China controls 98% of global gallium refining capacity. No significant alternative refiners.', 5, true);

-- Neodymium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('22222222-2222-2222-2222-222222222222', 'CN', 'refining', 'China processes 90%+ of global rare earth separation. MP Materials ships to China for processing.', 5, true),
('22222222-2222-2222-2222-222222222222', 'CN', 'export_control', 'China rare earth export quotas periodically imposed. History of supply weaponization.', 4, true);

-- Cobalt
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('33333333-3333-3333-3333-333333333333', 'CD', 'logistics', 'DRC infrastructure challenges: limited rail, port bottlenecks, political instability.', 4, true),
('33333333-3333-3333-3333-333333333333', 'CN', 'refining', 'China refines 70%+ of global cobalt. DRC ore shipped to China for processing.', 4, true);

-- Lithium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('44444444-4444-4444-4444-444444444444', 'CN', 'refining', 'China controls 65% of lithium refining despite limited mining. Chile/Australia ore processed in China.', 4, true);

-- Tungsten
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('55555555-5555-5555-5555-555555555555', 'CN', 'refining', 'China controls 84% of tungsten production and majority of APT refining.', 5, true),
('55555555-5555-5555-5555-555555555555', 'CN', 'export_control', 'China tungsten export quotas and licensing requirements in effect.', 4, true);

-- Silicon
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('66666666-6666-6666-6666-666666666666', 'CN', 'refining', 'China produces 79% of polysilicon. Xinjiang region accounts for 35% of global supply, facing sanctions pressure.', 5, true);

-- Copper
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('77777777-7777-7777-7777-777777777777', 'CL', 'logistics', 'Chilean copper production affected by water scarcity and aging mines. Grade decline ongoing.', 3, true);

-- Iron
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('88888888-8888-8888-8888-888888888888', 'AU', 'logistics', 'Australian iron ore exports concentrated through Port Hedland. Single point of failure risk.', 2, true);

-- Germanium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('735bf188-86e3-4f8b-91ae-d0987b88a6a9', 'CN', 'export_control', 'China export controls on germanium effective Aug 2023', 5, true);

-- Indium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('8aa74ca8-acac-42dd-b162-15db9845c8d7', 'CN', 'refining', 'China dominates indium refining, byproduct of zinc processing', 4, true);

-- Nickel
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('7cb13245-6987-4475-a6e6-f73e355a868e', 'ID', 'export_control', 'Indonesia nickel ore export ban to encourage domestic processing', 4, true);

-- Manganese
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('220cdade-a51f-4351-adc7-c5c4edb65c18', 'ZA', 'logistics', 'Rail and port infrastructure constraints', 3, true);

-- Dysprosium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('2cada705-1fa2-43ce-99f1-ec9853f4e520', 'CN', 'export_control', 'China rare earth export quotas and controls', 5, true);

-- Terbium
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('dc5d2db4-9804-41da-8edb-22bcada54506', 'CN', 'export_control', 'China rare earth export quotas and processing dominance', 5, true);

-- Molybdenum
INSERT INTO choke_points (metal_id, country_code, type, description, severity, active) VALUES
('1ab523ee-daa6-440c-b7a6-8745acadd88c', 'CN', 'refining', 'Growing domestic consumption reducing exports', 2, true);
```

---

## Notes

- UUIDs are fixed for easy cross-referencing
- All data represents 2024 estimates based on USGS and industry sources
- Run metals first, then supply/dependency/choke_points (foreign key constraints)
- Adjust percentages as new data becomes available
