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

-- Index pour améliorer les performances
CREATE INDEX idx_reservations_date ON reservations(date_souhaitee);
CREATE INDEX idx_reservations_statut ON reservations(statut);
CREATE INDEX idx_commandes_statut ON commandes_livres(statut);
