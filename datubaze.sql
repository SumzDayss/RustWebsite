-- ============================================================
-- Rust fan site - demo database seed
-- Run in MySQL Workbench: open this file and press Execute.
--
-- Safe to re-run:
--   * database and tables are created only if missing
--   * demo rows use fixed IDs, so they are replaced, not duplicated
--   * rows added through the admin panel (higher IDs) are kept
-- ============================================================

CREATE DATABASE IF NOT EXISTS rust_lapa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rust_lapa;

-- Older versions called the game table `spele`; rename it to match the
-- "Par spēli" section. Safe on fresh installs (does nothing).
SET @has_old_spele := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'spele'
);
SET @has_new_par_speli := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'par_speli'
);
SET @rename_sql := IF(@has_old_spele > 0 AND @has_new_par_speli = 0,
  'RENAME TABLE spele TO par_speli',
  'SELECT 1');
PREPARE rename_stmt FROM @rename_sql;
EXECUTE rename_stmt;
DEALLOCATE PREPARE rename_stmt;

CREATE TABLE IF NOT EXISTS par_speli (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nosaukums        VARCHAR(100) NOT NULL,
  izstradatajs     VARCHAR(100) NOT NULL,
  izdevejs         VARCHAR(100) NOT NULL,
  zanrs            VARCHAR(50)  NOT NULL,
  izdosanas_gads   YEAR         NOT NULL,
  platforma        VARCHAR(50)  NOT NULL DEFAULT 'PC',
  apraksts         TEXT         NOT NULL,
  galvenais_attels VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS zinas (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  spele_id            INT UNSIGNED NOT NULL,
  kategorija          VARCHAR(50)  NOT NULL,
  virsraksts          VARCHAR(150) NOT NULL,
  iss_apraksts        VARCHAR(255) NOT NULL,
  pilns_saturs        TEXT         NOT NULL,
  attels              VARCHAR(255) NOT NULL DEFAULT '',
  publicesanas_datums DATE         NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_zinas_spele FOREIGN KEY (spele_id)
    REFERENCES par_speli (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS galerija (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  spele_id    INT UNSIGNED NOT NULL,
  attela_cels VARCHAR(255) NOT NULL,
  nosaukums   VARCHAR(100) NOT NULL,
  apraksts    VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_galerija_spele FOREIGN KEY (spele_id)
    REFERENCES par_speli (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Game
-- ------------------------------------------------------------
INSERT IGNORE INTO par_speli
  (id, nosaukums, izstradatajs, izdevejs, zanrs, izdosanas_gads, platforma, apraksts, galvenais_attels)
VALUES
  (1, 'Rust', 'Facepunch Studios', 'Facepunch Studios', 'Izdzīvošana', 2018, 'PC',
   'Rust ir izdzīvošanas spēle atklātā pasaulē kopā ar citiem cilvēkiem. Vāc resursus, būvē bāzi un cīnies par izdzīvošanu.',
   'img/main.png');

-- ------------------------------------------------------------
-- News (newest first on the site, dates drive the order)
-- ------------------------------------------------------------
REPLACE INTO zinas
  (id, spele_id, kategorija, virsraksts, iss_apraksts, pilns_saturs, attels, publicesanas_datums)
VALUES
  (1, 1, 'Atjauninājums', 'Jauns atjauninājums',
   'Izstrādātāji ir līdzsvarojuši ieročus.',
   'Atjauninājumā pārstrādāti vairāki ieroči un pievienotas jaunas mantas.',
   'img/main.png', '2026-10-15'),

  (2, 1, 'Serveris', 'Servera vipes grafiks',
   'Šomēnes notiks ikmēneša vipe.',
   'Katra mēneša otrā piektdiena ir vipes diena. Pēc vipes visi sāk no jauna.',
   '', '2026-10-12'),

  (3, 1, 'Izpārdošana', 'Rust ir izpārdošanā',
   'Spēli var iegādāties ar atlaidi.',
   'Steam izpārdošanā Rust ir atlaide 50%.',
   '', '2026-10-05'),

  (4, 1, 'Padomi', 'Kā uzbūvēt pirmo bāzi',
   'Sāc ar divu istabu koka bāzi.',
   'Pirmajai bāzei pietiek ar 2x2 koka konstrukciju un kodu durvīm.',
   'img/hero.svg', '2026-09-28'),

  (5, 1, 'Notikumi', 'Sezonas noslēgums',
   'Komandas sacentās par uzvarētāja titulu.',
   'Serverī notika sezonas noslēguma pasākums ar balvām uzvarētājiem.',
   '', '2026-09-20'),

  (6, 1, 'Atjauninājums', 'Helikopteru transports atgriežas',
   'Jaunajā atjauninājumā atkal pieejami helikopteri.',
   'Pēc vairāku mēnešu pārtraukuma helikopteri atgriezušies spēlē ar uzlabotu degvielas patēriņu un jaunu krāsu shēmu.',
   'img/galerija/demo-1.png', '2026-10-24'),

  (7, 1, 'Serveris', 'Atvērts otrais Latvijas serveris',
   'RUST LATVIA x2 tagad pieejams.',
   'Otrais serveris ir paredzēts lielākām komandām - līdz 8 spēlētājiem. Reģistrējies Discord serverī, lai saņemtu piekļuvi.',
   'img/galerija/demo-2.png', '2026-10-22'),

  (8, 1, 'Notikumi', 'Helovīna pasākums visu nedēļu',
   'Īpašas balvas un briesmoņu uzbrukumi.',
   'No 26. līdz 31. oktobrim kartē parādīsies Helovīna dekorācijas, bet pieminekļos būs paaugstināts laupījums.',
   'img/galerija/demo-3.png', '2026-10-19'),

  (9, 1, 'Padomi', 'Kā aizsargāt bāzi no sprādzieniem',
   'Armatūra un akmens ir lētākais risinājums.',
   'Viena akmens siena iztur vairāk sprādzienu nekā koka. Ap bāzi izvieto barjeras un turi ārstniecības līdzekļus atsevišķā telpā.',
   '', '2026-10-16'),

  (10, 1, 'Izpārdošana', 'Atlaide 40% visai nedēļai',
   'Steam atlaide beigsies svētdien.',
   'Visas Rust kopijas un ādas ir pieejamas ar 40% atlaidi. Dāvanu kuponi darbojas arī pēc akcijas beigām.',
   'img/galerija/demo-4.png', '2026-10-10'),

  (11, 1, 'Atjauninājums', 'Jaunas ieroču ādas',
   'Pievienotas 12 jaunas ādas.',
   'Jaunajā kolekcijā iekļautas ādas šautenei, pistolei un cirvim. Tās var iegūt no jaunajām kastēm.',
   'img/galerija/demo-5.png', '2026-10-02'),

  (12, 1, 'Kopiena', 'Klana vakars piektdien',
   'Ieeja tikai ar Discord balss kanālu.',
   'Piektdien plkst. 20:00 notiks kopienas vakars. Dalībniekiem būs iespēja izmēģināt jauno karti pirms oficiālās palaišanas.',
   '', '2026-09-25'),

  (13, 1, 'Ceļvedis', 'Iesācēja ceļvedis: pirmās 24 stundas',
   'Ko darīt pirmajā spēles dienā.',
   'Sāc ar akmeni un koku, uzcel mazu bāzi tālu no ceļiem, un tikai pēc tam dodies uz pieminekļiem. Nekad neaizmirsti kodu durvis.',
   'img/galerija/demo-6.png', '2026-09-18'),

  (14, 1, 'Serveris', 'Septembra vipes grafiks',
   'Vipes notiks katru otro piektdienu.',
   'Nākamās vipes: 11. un 25. septembris plkst. 18:00 pēc Latvijas laika. Pēc vipes visi spēlētāji sāk no jauna.',
   '', '2026-09-10'),

  (15, 1, 'Atjauninājums', 'Jaunas alas un bunkuri',
   'Kartē parādījušās jaunas procedurālās alas.',
   'Alās atrodami reti resursi un jauni NPC ienaidnieki. Ieejas ir marķētas kartē ar zilu ikonu.',
   'img/galerija/demo-1.png', '2026-09-01'),

  (16, 1, 'Notikumi', 'Vasaras turnīrs noslēdzies',
   'Uzvarēja komanda Nordic Wolves.',
   'Trīs nedēļu turnīrā piedalījās 24 komandas. Finālā Nordic Wolves pārspēja komandu Iron Crew ar 3:1.',
   'img/galerija/demo-2.png', '2026-08-20'),

  (17, 1, 'Padomi', 'Elektrotīklu pamati',
   'Sāc ar mazu ģeneratoru un vienu akumulatoru.',
   'Elektrotīkls ir dārgs, tāpēc sāc ar vienu ģeneratoru, kas baro tikai kodu durvis un lampas. Vēlāk pievieno saules paneļus.',
   '', '2026-08-05'),

  (18, 1, 'Izpārdošana', 'Vasaras izpārdošana',
   'Pēdējā iespēja iegādāties ar atlaidi.',
   'Vasaras izpārdošana noslēdzas 31. augustā. Atlaide attiecas uz spēli, bet ne uz ādām.',
   'img/galerija/demo-3.png', '2026-07-28');

-- ------------------------------------------------------------
-- Gallery (images already included in img/galerija/)
-- ------------------------------------------------------------
REPLACE INTO galerija
  (id, spele_id, attela_cels, nosaukums, apraksts)
VALUES
  (1, 1, 'img/galerija/demo-1.png', 'Saullēkts pie bāzes', 'Koka bāze ar novērošanas torni.'),
  (2, 1, 'img/galerija/demo-2.png', 'Nakts reids', 'Komanda dodas uz militāro bāzi.'),
  (3, 1, 'img/galerija/demo-3.png', 'Pirmā bāze', '2x2 koka konstrukcija ar kodu durvīm.'),
  (4, 1, 'img/galerija/demo-4.png', 'Pamests piemineklis', 'Rūpnīca kartes ziemeļos.'),
  (5, 1, 'img/galerija/demo-5.png', 'Resursu ieguve', 'Sēra un metāla ieguve.'),
  (6, 1, 'img/galerija/demo-6.png', 'Motocikls', 'Transportlīdzeklis gatavs braucienam.');
