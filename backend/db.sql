CREATE DATABASE IF NOT EXISTS back2you CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE back2you;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    phone       VARCHAR(20)   DEFAULT NULL,
    pincode     VARCHAR(10)   DEFAULT NULL,
    password    VARCHAR(255)  NOT NULL,
    created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP
);

-- Pet reports table
CREATE TABLE IF NOT EXISTS pet_reports (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    category        ENUM('lost','found')  NOT NULL,
    name            VARCHAR(100)          NOT NULL DEFAULT 'Unknown',
    gender          VARCHAR(20)           NOT NULL DEFAULT 'Unknown',
    type            VARCHAR(50)           NOT NULL,
    breed           VARCHAR(100)          DEFAULT NULL,
    location        VARCHAR(200)          NOT NULL,
    landmark        VARCHAR(200)          DEFAULT NULL,
    date_reported   DATE                  NOT NULL,
    description     TEXT                  DEFAULT NULL,
    image_url       VARCHAR(500)          DEFAULT NULL,
    reported_by     INT                   NOT NULL,
    is_reunited     TINYINT(1)            DEFAULT 0,
    created_at      DATETIME              DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_category    ON pet_reports(category);
CREATE INDEX IF NOT EXISTS idx_reported_by ON pet_reports(reported_by);

INSERT IGNORE INTO users (id, name, email, phone, pincode, password)
VALUES (1, 'Back2You Demo', 'demo@back2you.com', NULL, NULL, '$2y$12$LOCKEDACCOUNTCANNOTLOGINXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

-- LOST PETS
INSERT IGNORE INTO pet_reports (id, category, name, gender, type, breed, location, landmark, date_reported, description, image_url, reported_by) VALUES
(1,  'lost', 'Tommy',   'Male',   'Dog',    'Belgian Malinois',    'Kurla, Mumbai',            'Near Kurla Station',          '2026-01-21', 'Very friendly, responds to his name. Wearing a red collar with a tag.',                                  '/images/dog1.jpeg',  1),
(2,  'lost', 'Bruno',   'Male',   'Dog',    'German Shepherd',     'Andheri West, Mumbai',     'Near Infinity Mall',          '2026-01-19', 'Large build, trained dog. May appear aggressive but is gentle with familiar people.',                   '/images/dog2.jpg',   1),
(3,  'lost', 'Luna',    'Female', 'Cat',    'Persian',             'Thane West',               'Near Viviana Mall',           '2026-01-18', 'White Persian cat with striking blue eyes. Strictly indoor pet, may be scared.',                        '/images/cat1.jpg',   1),
(4,  'lost', 'Milo',    'Male',   'Cat',    'Maine Coon',          'Vashi, Navi Mumbai',       'Near Inorbit Mall',           '2026-01-20', 'Brown long-haired cat with a very fluffy tail. Friendly and curious.',                                  '/images/cat2.jpg',   1),
(5,  'lost', 'Oreo',    'Male',   'Rabbit', 'Dutch Rabbit',        'Vasai East',               'Near Vasai Bus Depot',        '2026-01-17', 'Black and white rabbit, very calm and friendly. Comes to you if you crouch down.',                      '/images/rabbit1.jpg',1),
(6,  'lost', 'Buddy',   'Male',   'Dog',    'Golden Retriever',    'Ghodbunder Road, Thane',   'Near Hiranandani Estate',     '2026-01-20', 'Golden retriever, very playful and friendly. Loves fetch and responds to Buddy.',                       '/images/dog3.jpg',   1),
(7,  'lost', 'Simba',   'Male',   'Cat',    'Tabby',               'Bandra West, Mumbai',      'Near Bandra Bandstand',       '2026-01-22', 'Orange tabby cat with a small notch on left ear. Very vocal, will meow back at you.',                   '/images/cat3.jpg',   1),
(8,  'lost', 'Max',     'Male',   'Dog',    'Beagle',              'Mulund West, Mumbai',      'Near Mulund Check Naka',      '2026-01-23', 'Small beagle with a brown, black and white coat. Very food motivated and friendly.',                    '/images/dog5.jpg',   1),
(9,  'lost', 'Daisy',   'Female', 'Dog',    'Pomeranian',          'Borivali West, Mumbai',    'Near Borivali Station',       '2026-01-24', 'Tiny cream-colored Pomeranian. Wearing a pink bow. Very timid around strangers.',                       '/images/dog6.jpg',   1),
(10, 'lost', 'Shadow',  'Male',   'Cat',    'Bombay',              'Chembur, Mumbai',          'Near RCF Colony Gate',        '2026-01-25', 'All-black Bombay cat with bright yellow eyes. Neutered male, microchipped.',                            '/images/cat4.jpg',   1),
(11, 'lost', 'Pepper',  'Female', 'Rabbit', 'Rex Rabbit',          'Kalyan East',              'Near Kalyan Railway Station', '2026-01-23', 'Grey velvety Rex rabbit. Medium size, thumps when nervous. Escaped from backyard.',                     '/images/rabbit3.jpg',1),
(12, 'lost', 'Rocky',   'Male',   'Dog',    'Rottweiler',          'Airoli, Navi Mumbai',      'Near Airoli Bridge',          '2026-01-26', 'Large Rottweiler with a blue ID tag. Well-trained, unlikely to bite. Loves belly rubs.',                '/images/dog7.jpg',   1),
(13, 'lost', 'Mittens', 'Female', 'Cat',    'Calico',              'Dombivli East',            'Near Dombivli Station Market','2026-01-27', 'Tricolour calico with distinctive orange patch on forehead. Very shy, may hide.',                       '/images/cat5.jpg',   1),
(14, 'lost', 'Charlie', 'Male',   'Dog',    'Labrador Retriever',  'Panvel, Navi Mumbai',      'Near Panvel Bus Stand',       '2026-01-28', 'Black Labrador, 2 years old. Wearing a green collar. Very energetic to and loves people.',                 '/images/dog8.jpg',   1),
(15, 'lost', 'Tweety',  'Female', 'Bird',   'Budgerigar',          'Kandivali East, Mumbai',   'Near Kandivali Metro Station','2026-01-29', 'Yellow and green budgie. Very chatty, knows a few words. Flew out of an open window.',                  '/images/bird3.jpg',  1),
(16, 'lost', 'Ginger',  'Female', 'Cat',    'Domestic Shorthair',  'Vikhroli, Mumbai',         'Near Godrej Colony Gate',     '2026-01-30', 'Ginger and white cat, very affectionate. Spayed female, wearing a yellow bell collar.',                 '/images/cat6.jpg',   1),

-- FOUND PETS
(17, 'found', 'Snowy',   'Female', 'Rabbit', 'Angora',             'Borivali East, Mumbai',    'Near National Park Gate',     '2026-01-16', 'White fluffy rabbit found near the park gate. Seems well-fed and tamed, clearly a pet.',               '/images/rabbit2.jpg',1),
(18, 'found', 'Kiwi',    'Female', 'Bird',   'Lovebird',           'Vasai West',               'Near Vasai Beach',            '2026-01-15', 'Green lovebird found near the beach. Responds to whistles, clearly hand-raised.',                       '/images/bird1.jpg',  1),
(19, 'found', 'Coco',    'Male',   'Bird',   'Cockatiel',          'Powai, Mumbai',            'Near Powai Lake',             '2026-01-22', 'Grey cockatiel with yellow crest found near the lake. Hand-tamed, very calm.',                          '/images/bird2.jpg',  1),
(20, 'found', 'Bella',   'Female', 'Dog',    'Labrador Retriever', 'Nerul, Navi Mumbai',       'Near DY Patil Stadium',       '2026-01-21', 'Light brown Labrador wearing a blue collar. Very friendly and well-trained, knows commands.',            '/images/dog4.jpg',   1),
(21, 'found', 'Unknown', 'Male',   'Dog',    'Indie / Mixed',      'Thane West',               'Near Thane Station Platform 1','2026-01-23','Brown and white mixed breed dog found near the station. Well-groomed, likely a pet.',                   '/images/dog9.jpg',   1),
(22, 'found', 'Unknown', 'Female', 'Cat',    'Siamese Mix',        'Andheri East, Mumbai',     'Near MIDC Metro Station',     '2026-01-24', 'Cream-coloured Siamese mix, blue eyes. Found hiding under a car. No collar but very tame.',             '/images/cat7.jpg',   1),
(23, 'found', 'Peanut',  'Male',   'Rabbit', 'Holland Lop',        'Mira Road',                'Near Mira Road Market',       '2026-01-25', 'Small floppy-eared rabbit, light brown. Found in a garden. Very calm and tame.',                        '/images/rabbit4.jpg',1),
(24, 'found', 'Unknown', 'Male',   'Dog',    'Pug',                'Mulund East, Mumbai',      'Near Mulund Garden',          '2026-01-26', 'Fawn pug with a green harness, no tag. Found sitting outside a building, waiting.',                     '/images/dog10.jpg',  1),
(25, 'found', 'Unknown', 'Female', 'Cat',    'Tabby',              'Dombivli West',            'Near Dombivli West Station',  '2026-01-27', 'Grey tabby found meowing near the station at night. Spayed, friendly, clearly someone\'s pet.',         '/images/cat8.jpg',   1),
(26, 'found', 'Polo',    'Male',   'Dog',    'Dalmatian',          'Kharghar, Navi Mumbai',    'Near Central Park Kharghar',  '2026-01-28', 'Young Dalmatian found running loose in the park. Collar with name Polo but no number.',                 '/images/dog11.jpg',  1),
(27, 'found', 'Unknown', 'Male',   'Bird',   'Indian Ringneck',    'Bhayandar West',           'Near Bhayandar Station',      '2026-01-29', 'Green ringneck parrot found perched on a shop sign. Tame, says a few words in Hindi.',                  '/images/bird4.jpg',  1),
(28, 'found', 'Cookie',  'Female', 'Dog',    'Cocker Spaniel',     'Goregaon East, Mumbai',    'Near Oberoi Mall',            '2026-01-30', 'Golden Cocker Spaniel with curly ears. Has a collar tag reading Cookie.',                               '/images/dog12.jpg',  1),
(29, 'found', 'Unknown', 'Female', 'Rabbit', 'Lionhead',           'Kalyan West',              'Near Kalyan Bus Depot',       '2026-01-31', 'White lionhead rabbit with a fluffy mane. Found in a roadside bush, malnourished.',                     '/images/rabbit5.jpg',1),
(30, 'found', 'Unknown', 'Male',   'Cat',    'Russian Blue Mix',   'Chembur, Mumbai',          'Near Diamond Garden',         '2026-02-01', 'Grey-blue cat with green eyes found in the garden. Neutered, very well-behaved.',                        '/images/cat9.jpg',   1),
(31, 'found', 'Unknown', 'Male',   'Dog',    'Shih Tzu',           'Worli, Mumbai',            'Near Worli Sea Face',         '2026-02-02', 'Small white Shih Tzu found near the seaface. Groomed recently, wearing a tiny red bow.',                '/images/dog13.jpg',  1),
(32, 'found', 'Sunny',   'Male',   'Bird',   'Canary',             'Santacruz West, Mumbai',   'Near Santacruz Market',       '2026-02-03', 'Bright yellow canary found in a courtyard. In good health, sings beautifully.',                         '/images/bird5.jpg',  1);