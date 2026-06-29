# Odoo — Business Suite

Odoo is an all-in-one business management platform. It includes CRM, invoicing, inventory, project management, and more — all running on your PCS.

## Installing Odoo

1. Open the **App Store**
2. Search for **Odoo**
3. Click **Install**
4. Wait for the installation to complete

## First-Time Setup

1. Open Odoo from your dashboard
2. You'll see the database creation screen
3. Fill in the required fields:
   - **Master Password**: leave as default or set a new one
   - **Database Name**: your company or project name
   - **Email**: your admin login email
   - **Password**: your admin password
   - **Language**: select your language
   - **Country**: select your country
4. Click **Create Database**

> **Note:** Database creation may take a minute. Don't refresh the page.

## Installing Apps

Odoo uses a modular system. Install only what you need:

1. Go to the **Apps** menu
2. Browse or search for modules
3. Click **Install** on the ones you want

Popular modules:

| Module | Description |
|--------|-------------|
| CRM | Manage leads and sales pipeline |
| Invoicing | Create and send invoices |
| Project | Task and project management |
| Inventory | Track stock and warehouses |
| Website | Build a simple website |
| Calendar | Schedule meetings and events |

## Basic Navigation

- **Top menu bar**: Switch between installed apps
- **Search bar**: Filter and search records
- **Kanban / List views**: Toggle between different display modes
- **Settings**: Access via the gear icon in the top-right

## Managing Users

1. Go to **Settings > Users & Companies > Users**
2. Click **Create**
3. Set name, email, and access rights
4. Click **Save**
5. The user will receive an invitation email

## Data Storage

All Odoo data is stored in a PostgreSQL database on your PCS at `/DATA/AppData/odoo/`. Your business data never leaves your server.
