# RS Web

This is the RS Web project, developed using Laravel and React. It aims to provide a web platform for managing and interacting with data in a seamless and efficient manner.

## Requirements

Before setting up the project, ensure that you have the following installed:

- PHP (version 8.3 or higher)
- Composer
- Node.js (version 16 or higher)
- NPM
- MySQL or MariaDB

## Installation

Follow the steps below to set up the project:

### 1. Clone the repository

```bash
git clone https://github.com/Satrio215/rsWeb.git
cd rsWeb

### 2. Install npm and Composer

```bash
npm i
composer i

### 3. setting env

```bash
cp .env.example .env


### 4. migrate tabel ke database

```bash
php artisan migrate:fresh --seed

### 5. run aplikasi

```bash
npm run dev
php artisan serve

