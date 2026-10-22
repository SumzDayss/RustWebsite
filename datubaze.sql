CREATE DATABASE IF NOT EXISTS rust_lapa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rust_lapa;

CREATE TABLE spele (
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

CREATE TABLE zinas (
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
    REFERENCES spele (id)
) ENGINE=InnoDB;

CREATE TABLE galerija (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  spele_id    INT UNSIGNED NOT NULL,
  attela_cels VARCHAR(255) NOT NULL,
  nosaukums   VARCHAR(100) NOT NULL,
  apraksts    VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_galerija_spele FOREIGN KEY (spele_id)
    REFERENCES spele (id)
) ENGINE=InnoDB;

INSERT INTO spele
  (nosaukums, izstradatajs, izdevejs, zanrs, izdosanas_gads, platforma, apraksts, galvenais_attels)
VALUES
  ('Rust', 'Facepunch Studios', 'Facepunch Studios', 'Izdzīvošana', 2018, 'PC',
   'Rust ir izdzīvošanas spēle atklātā pasaulē kopā ar citiem cilvēkiem.',
   'img/main.png');

INSERT INTO zinas
  (spele_id, kategorija, virsraksts, iss_apraksts, pilns_saturs, attels, publicesanas_datums)
VALUES
  (1, 'Atjauninājums', 'Jauns atjauninājums',
   'Izstrādātāji ir līdzsvarojuši ieročus.',
   'Atjauninājumā pārstrādāti vairāki ieroči un pievienotas jaunas mantas.',
   'img/main.png', '2026-10-15'),

  (1, 'Serveris', 'Servera vipes grafiks',
   'Šomēnes notiks ikmēneša vipe.',
   'Katra mēneša otrā piektdiena ir vipes diena. Pēc vipes visi sāk no jauna.',
   '', '2026-10-12'),

  (1, 'Izpārdošana', 'Rust ir izpārdošanā',
   'Spēli var iegādāties ar atlaidi.',
   'Steam izpārdošanā Rust ir atlaide 50%.',
   '', '2026-10-05'),

  (1, 'Padomi', 'Kā uzbūvēt pirmo bāzi',
   'Sāc ar divu istabu koka bāzi.',
   'Pirmajai bāzei pietiek ar 2x2 koka konstrukciju un kodu durvīm.',
   'img/hero.svg', '2026-09-28'),

  (1, 'Notikumi', 'Sezonas noslēgums',
   'Komandas sacentās par uzvarētāja titulu.',
   'Serverī notika sezonas noslēguma pasākums ar balvām uzvarētājiem.',
   '', '2026-09-20');

INSERT INTO galerija
  (spele_id, attela_cels, nosaukums, apraksts)
VALUES
  (1, 'img/galerija/01.svg', 'Koka bāze', 'Pirmā bāze no koka.'),
  (1, 'img/galerija/02.svg', 'Akmens rūpnīca', 'Resursu vieta laukā.'),
  (1, 'img/galerija/03.svg', 'Nakts uzbrukums', 'Komanda dodas uzbrukumā.'),
  (1, 'img/galerija/04.svg', 'Signālraķete', 'Raķete norāda uz pieminekli.'),
  (1, 'img/galerija/05.svg', 'Ugunskurs', 'Spēlētāji sasildās pie ugunskura.');
