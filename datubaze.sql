CREATE DATABASE IF NOT EXISTS rust_lapa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rust_lapa;

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


INSERT IGNORE INTO par_speli
  (id, nosaukums, izstradatajs, izdevejs, zanrs, izdosanas_gads, platforma, apraksts, galvenais_attels)
VALUES
  (1, 'Rust', 'Facepunch Studios', 'Facepunch Studios', 'Izdzīvošana', 2018, 'PC',
   'Rust ir izdzīvošanas spēle atklātā pasaulē kopā ar citiem cilvēkiem. Vāc resursus, būvē bāzi un cīnies par izdzīvošanu.',
   'img/main.png');

DELETE FROM zinas WHERE id BETWEEN 10 AND 18 OR attels LIKE 'img/galerija/demo-%';

REPLACE INTO zinas
  (id, spele_id, kategorija, virsraksts, iss_apraksts, pilns_saturs, attels, publicesanas_datums)
VALUES
  (1, 1, 'devblog', 'Halloween 2026',
   'Salas tumsā atgriežas briesmoņi, un nejaušās vietās atveras plaisas.',
   'Salai pārklājas tumsa, un briesmoņi pamostas no miega. Plaisas atveras nejaušās vietās un ved uz nezināmu galamērķi. Ja uzdrošināsies tajās ieiet, labāk esi sagatavojies!',
   'img/galerija/rust_news1.png', '2026-10-22'),

  (2, 1, 'devblog', 'Livestock Update',
   'Būtiski atjaunota lauksaimniecība ar jauniem lopkopības dzīvniekiem un biodegvielas ģeneratoru.',
   'Šī mēneša atjauninājums ievērojami atsvaidzina lauksaimniecību, pievienojot jaunus lopkopības dzīvniekus, kritērus un peldētājus. Tāpat tas ievieš jaunas ēdienu receptes, jauno biodegvielas ģeneratoru, pārstrādātas smilšu maisu barikādes un jaunas Powergrid loot telpas, ko izlaupīt. Kā ierasts, iekļauti arī kļūdu labojumi, uzlabojumi un ērtuma izmaiņas.',
   'img/galerija/rust_news2.png', '2026-10-01'),

  (3, 1, 'devblog', 'Breach and Clear',
   'Pieminekļu bloķētāji, salaužams helikoptera bruņojums un daudz balansa uzlabojumu.',
   'Šī mēneša atjauninājums ievieš pieminekļu bloķētājus, salaužamu uzbrukuma helikoptera bruņojumu, HQM resursu punktus un uzturēšanas grupu mērogošanu. Tam pievienoti dažādi priekšmetu uzlabojumi, ērtuma un balansa izmaiņas, kā arī daudzi veiktspējas uzlabojumi un vēl daudz kas cits.',
   'img/galerija/rust_news3.png', '2026-09-03'),

  (4, 1, 'devblog', 'Power Trip',
   'Spēlētāju uzturēti pieminekļi un atjaunojama spēkstacija.',
   'Šī mēneša atjauninājums ievieš spēlētāju uzturētus pieminekļus jaunā Satellite Crash veidolā, kupola sūknēšanu un atjaunojamu spēkstaciju, kā arī vēl citas izmaiņas. Tāpat iekļauts daudz balansa izmaiņu, kļūdu labojumu, optimizāciju, uzlabojumu un citu pilnveidojumu.',
   'img/galerija/rust_news4.png', '2026-08-06'),

  (5, 1, 'devblog', 'Common Ground',
   'Jauns daudzdzīvokļu kompleksa piemineklis, izīrējami veikali un jauna klanu sistēma.',
   'Šī mēneša atjauninājumā ir jauns piemineklis — daudzdzīvokļu komplekss, izīrējami veikali, jauna klanu sistēma un galds, kā arī ērtuma uzlabojumi un vēl daudz kas cits.',
   'img/galerija/rust_news5.png', '2026-07-02'),

  (6, 1, 'devblog', 'Built Different',
   'Lielākā spēlētāju pārstrāde vairāku gadu laikā ar jauniem modeļiem un M16A2.',
   'Šī mēneša atjauninājums nes Rust lielāko spēlētāju pārstrādi vairāku gadu laikā: jaunus spēlētāju modeļus un animācijas, jaunu bruņu komplektu un M16A2 šauteni. Tajā iekļauti arī ērtuma uzlabojumi, kļūdu labojumi, veiktspējas uzlabojumi un vēl daudz kas cits.',
   'img/galerija/rust_news6.png', '2026-06-04'),

  (7, 1, 'devblog', 'Upgrade hard, raid harder',
   'Darbgalda uzlabojumi, jaunais mīnmetējs un uzlabota signalizācija.',
   'Šī mēneša atjauninājums ievieš darbgalda uzlabojumus, jauno mīnmetēju un uzlabotu skārda bundžu signalizāciju, kā arī modeļu atsvaidzināšanu un pārveidošanu. Tam pievienoti daudzi ērtuma uzlabojumi, kļūdu labojumi un citas izmaiņas.',
   'img/galerija/rust_news7.png', '2026-05-07'),

  (8, 1, 'devblog', 'Spring Clean',
   'Divi jauni priekšmeti un daudz uzlabojumu un labojumu.',
   'Šī mēneša atjauninājums ievieš DIVUS jaunus priekšmetus — bruņoto kāpņu lūkas vāku un ūdens riteni. Papildus tam ir ļoti daudz ērtuma uzlabojumu, kļūdu labojumu, labāka veiktspēja un vēl daudz kas cits.',
   'img/galerija/rust_news8.png', '2026-04-02'),

  (9, 1, 'devblog', 'Shipshape',
   'Lieli uzlabojumi dzīvei un cīņām uz ūdens un dziļjūrā.',
   'Šī mēneša atjauninājums būtiski uzlabo to, kā dzīvot, būvēt un cīnīties uz ūdens un dziļjūrā. Tāpat tas pagarina dienas gaišo laiku un ievieš balansa izmaiņas, labojumus un ērtuma uzlabojumus.',
   'img/galerija/rust_news9.png', '2026-03-05');


DELETE FROM galerija WHERE attela_cels LIKE 'img/galerija/demo-%';

REPLACE INTO galerija
  (id, spele_id, attela_cels, nosaukums, apraksts)
VALUES
  (1, 1, 'img/galerija/rust_news1.png', 'Halloween 2026', 'Salai pārklājas tumsa, un briesmoņi pamostas no miega. Plaisas atveras nejaušās vietās un ved uz nezināmu galamērķi.'),
  (2, 1, 'img/galerija/rust_news2.png', 'Livestock Update', 'Komanda dodas uz militāro bāzi.'),
  (3, 1, 'img/galerija/rust_news3.png', 'Breach and Clear', 'Pieminekļu bloķētāji, salaužams uzbrukuma helikoptera bruņojums, HQM resursu punkti un uzturēšanas grupu mērogošana.'),
  (4, 1, 'img/galerija/rust_news4.png', 'Power Trip', 'Spēlētāju uzturēti pieminekļi jaunā Satellite Crash veidolā, kupola sūknēšana un atjaunojama spēkstacija.'),
  (5, 1, 'img/galerija/rust_news5.png', 'Common Ground', 'Jauns piemineklis — daudzdzīvokļu komplekss, izīrējami veikali un jauna klanu sistēma ar galdu.'),
  (6, 1, 'img/galerija/rust_news6.png', 'Built Different', 'Lielākā spēlētāju pārstrāde vairāku gadu laikā: jauni modeļi un animācijas, jauns bruņu komplekts un M16A2 šautene.');
