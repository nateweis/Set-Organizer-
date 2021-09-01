DROP DATABASE IF EXISTS draft_organizer;
CREATE DATABASE draft_organizer;
\c draft_organizer;

CREATE TABLE cards(id INT, card TEXT, rank VARCHAR(6), deck_id TEXT, set_name VARCHAR(56));
CREATE TABLE decks(id INT, set_name VARCHAR(56), colors VARCHAR(36));