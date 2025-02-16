# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_21
    pkgs.openssl.dev
  ];

  # Sets environment variables in the workspace
  env = {
    # You can get a Gemini API key through the IDX Integrations panel to the left!
    POSTGRESQL_CONN_STRING = "postgresql://user:mypassword@localhost:5432/appointments?sslmode=disable";
  };

  services.postgres = {
    enable = true;
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "mtxr.sqltools-driver-pg"
      "mtxr.sqltools"
      "mhutchie.git-graph"
    ];

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # npm-install = "yarn install";
        default.openFiles = [
          "README.md" "create.sql" "example.sql"
        ];
        # Example: install JS dependencies from NPM
        setup = ''
          initdb -D db/local
          psql --dbname=postgres -c "ALTER USER \"user\" PASSWORD 'mypassword';"
          psql --dbname=postgres -c "CREATE DATABASE appointments;"
          psql --dbname=appointments -f create.sql
          psql --dbname=appointments -f example.sql
          psql --dbname=postgres -c "CREATE DATABASE salon_appointment;"
          psql --dbname=salon_appointment -U $PG_USER -d salon_appointment -f db/scripts/db-salon.sql
        '';
      };
      # Runs when the workspace is (re)started
      onStart = {
        npm-install = "yarn install";
        # npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing && cd app && npm ci --no-audit --prefer-offline --no-progress --timing";
        # typescript-build = "tsc";
      };
    };

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          # command = ["npm" "run" "dev"  "--" "--port" "$PORT" "--host" "0.0.0.0"];
          # command = ["yarn" "dev" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
