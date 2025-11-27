# Gator

A command-line RSS feed aggregator that allows you to manage and browse RSS feeds from your terminal.

## Prerequisites

Before running Gator, you'll need:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **PostgreSQL database** (local or remote)

## Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run database migrations:
   ```bash
   npm run migrate
   ```

## Configuration

Gator requires a configuration file located at `~/.gatorconfig.json` in your home directory.

Create the file manually with the following structure:

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator",
  "current_user_name": "your_username"
}
```

Replace the values with:
- `db_url`: Your PostgreSQL connection string
- `current_user_name`: Your username (must be registered first)

**Note**: You can use the `register` and `login` commands to set up your user.

## Running the CLI

Use npm to run commands:

```bash
npm start <command> [arguments]
```

Or if you're using tsx directly:

```bash
tsx ./src/index.ts <command> [arguments]
```

## Available Commands

### User Management

- **`register <username>`** - Create a new user account
  ```bash
  npm start register john
  ```

- **`login <username>`** - Set the current user in the config
  ```bash
  npm start login john
  ```

- **`users`** - List all registered users
  ```bash
  npm start users
  ```

### Feed Management

- **`addfeed <name> <url>`** - Add a new RSS feed (requires login)
  ```bash
  npm start addfeed "TechCrunch" "https://techcrunch.com/feed/"
  ```

- **`feeds`** - List all feeds
  ```bash
  npm start feeds
  ```

### Following Feeds

- **`follow <feed_url>`** - Follow a feed (requires login)
  ```bash
  npm start follow "https://techcrunch.com/feed/"
  ```

- **`following`** - List all feeds you're following (requires login)
  ```bash
  npm start following
  ```

- **`unfollow <feed_url>`** - Unfollow a feed (requires login)
  ```bash
  npm start unfollow "https://techcrunch.com/feed/"
  ```

### Browsing Posts

- **`browse [limit]`** - View recent posts from feeds you follow (requires login)
  ```bash
  npm start browse
  npm start browse 5
  ```

### Aggregation

- **`agg [time_between_requests]`** - Fetch and aggregate posts from all feeds
  ```bash
  npm start agg
  npm start agg 60s
  ```
  Time format: `60s` for 60 seconds, `5m` for 5 minutes, etc.

### Maintenance

- **`reset`** - Reset the database (clears all data)
  ```bash
  npm start reset
  ```

## Example Workflow

1. Register a new user:
   ```bash
   npm start register alice
   ```

2. Add some RSS feeds:
   ```bash
   npm start addfeed "TechCrunch" "https://techcrunch.com/feed/"
   npm start addfeed "Hacker News" "https://news.ycombinator.com/rss"
   npm start addfeed "Boot.dev Blog" "https://blog.boot.dev/index.xml"
   ```

3. Follow the feeds:
   ```bash
   npm start follow "https://techcrunch.com/feed/"
   npm start follow "https://news.ycombinator.com/rss"
   ```

4. Fetch posts from feeds:
   ```bash
   npm start agg
   ```

5. Browse the latest posts:
   ```bash
   npm start browse 10
   ```

## Development

- **Generate migrations**: `npm run generate`
- **Run migrations**: `npm run migrate`
- **Seed database**: `npm run seed`

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database
- **fast-xml-parser** - RSS feed parsing
