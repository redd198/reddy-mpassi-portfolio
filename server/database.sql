-- Créer la base de données
CREATE DATABASE IF NOT EXISTS reddy_portfolio;
USE reddy_portfolio;

-- Supprimer les tables existantes si elles existent
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS commandes_livres;
DROP TABLE IF EXISTS newsletter;

-- Table pour les réservations de coaching
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    theme VARCHAR(255) NOT NULL,
    objectif TEXT NOT NULL,
    date_souhaitee DATE NOT NULL,
    heure_souhaitee TIME NOT NULL,
    paiement VARCHAR(100) NOT NULL,
    statut ENUM('en_attente', 'confirmee', 'annulee') DEFAULT 'en_attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table pour les commandes de livres
CREATE TABLE commandes_livres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    livre VARCHAR(255) NOT NULL,
    statut ENUM('en_attente', 'traitee', 'annulee') DEFAULT 'en_attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table pour les abonnements newsletter
CREATE TABLE newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les leads (livre gratuit, webinaire, etc.)
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    preference ENUM('email', 'whatsapp') DEFAULT 'whatsapp',
    source VARCHAR(100) DEFAULT 'site-web',
    produit VARCHAR(255) DEFAULT 'Livre gratuit',
    statut ENUM('nouveau', 'contacte', 'converti') DEFAULT 'nouveau',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email_source (email, source)
);

-- Table pour les administrateurs
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour le tracking des visiteurs
CREATE TABLE visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45),
    country VARCHAR(100),
    city VARCHAR(100),
    page_url VARCHAR(500),
    referrer VARCHAR(500),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer un admin par défaut (username: admin, password: Admin@2024)
-- Le mot de passe est hashé avec bcrypt
INSERT INTO admins (username, password, email) VALUES 
('admin', '$2b$10$eSMQ8TPEN64WSMMLLTwF7eqKUZSpOQzfNE6KPwwuv4xt6i.b3.v7K', 'reddympassi@gmail.com');

-- Index pour améliorer les performances
CREATE INDEX idx_reservations_date ON reservations(date_souhaitee);
CREATE INDEX idx_reservations_statut ON reservations(statut);
CREATE INDEX idx_commandes_statut ON commandes_livres(statut);
CREATE INDEX idx_visitors_country ON visitors(country);
CREATE INDEX idx_visitors_created ON visitors(created_at);
