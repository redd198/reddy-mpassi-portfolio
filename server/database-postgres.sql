-- Tables PostgreSQL pour le portfolio

-- Table pour les leads (livre gratuit, webinaire, etc.)
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    preference VARCHAR(20) DEFAULT 'whatsapp' CHECK (preference IN ('email', 'whatsapp')),
    source VARCHAR(100) DEFAULT 'site-web',
    produit VARCHAR(255) DEFAULT 'Livre gratuit',
    statut VARCHAR(20) DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'contacte', 'converti')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email, source)
);

-- Table pour les administrateurs
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour le tracking des visiteurs
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45),
    country VARCHAR(100),
    city VARCHAR(100),
    page_url VARCHAR(500),
    referrer VARCHAR(500),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer un admin par défaut (username: admin, password: Admin@2024)
INSERT INTO admins (username, password, email) VALUES 
('admin', '$2b$10$eSMQ8TPEN64WSMMLLTwF7eqKUZSpOQzfNE6KPwwuv4xt6i.b3.v7K', 'reddympassi@gmail.com')
ON CONFLICT (username) DO NOTHING;

-- Table pour les réservations de coaching
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    theme VARCHAR(255) NOT NULL,
    objectif TEXT NOT NULL,
    date_souhaitee DATE NOT NULL,
    heure_souhaitee TIME NOT NULL,
    paiement VARCHAR(100) NOT NULL,
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'annulee')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les commandes de livres
CREATE TABLE IF NOT EXISTS commandes_livres (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    livre VARCHAR(255) NOT NULL,
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'traitee', 'annulee')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les abonnements newsletter
CREATE TABLE IF NOT EXISTS newsletter (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date_souhaitee);
CREATE INDEX IF NOT EXISTS idx_reservations_statut ON reservations(statut);
CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes_livres(statut);
CREATE INDEX IF NOT EXISTS idx_visitors_country ON visitors(country);
CREATE INDEX IF NOT EXISTS idx_visitors_created ON visitors(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_statut ON leads(statut);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_commandes_updated_at ON commandes_livres;
CREATE TRIGGER update_commandes_updated_at BEFORE UPDATE ON commandes_livres
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
