export const API_DOMAIN =
  process.env.VUE_APP_API_DOMAIN ?? "http://localhost:8000";
export const ADMIN_LOGIN_URI = "/api/admin/login";
export const FETCH_DEVICES = "/api/devices";
export const FETCH_GAME_GENERATIONS = "/api/game-generations";
export const FETCH_GAMES = "/api/games";
export const FETCH_PEOPLE = "/api/people";
export const FETCH_ROLES = "/api/roles";
export const FETCH_TOURNAMENT_INSCRIPTIONS = "/api/inscriptions";
export const FETCH_TOURNAMENT_RESULTS =
  "/api/tournaments/:tournamentId/results";
export const FETCH_TOURNAMENT_RULES = "/api/tournament-rules";
export const FETCH_TOURNAMENT_SYSTEMS = "/api/tournament-systems";
export const FETCH_TOURNAMENT_TYPES = "/api/tournament-types";
export const FETCH_TOURNAMENTS = "/api/tournaments";

export const CREATE_GAME_GENERATION = "/api/game-generations";
export const CREATE_ROLE = "/api/roles";
export const CREATE_DEVICE = "/api/devices";
export const CREATE_TOURNAMENT = "/api/tournaments";
export const CREATE_TOURNAMENT_RULE = "/api/tournament-rules";
export const CREATE_TOURNAMENT_SYSTEM = "/api/tournament-systems";
export const CREATE_TOURNAMENT_TYPE = "/api/tournament-types";

export const GET_GAME_GENERATION = "/api/game-generations/:gameGenerationId";
export const GET_ROLE = "/api/roles/:roleId";
export const GET_DEVICE = "/api/devices/:deviceId";
export const GET_TOURNAMENT = "/api/tournaments/:tournamentId";
export const GET_TOURNAMENT_INSCRIPTION =
  "/api/inscriptions/:tournamentInscriptionId";
export const GET_TOURNAMENT_RULE = "/api/tournament-rules/:tournamentRuleId";
export const GET_TOURNAMENT_SYSTEM =
  "/api/tournament-systems/:tournamentSystemId";
export const GET_TOURNAMENT_TYPE = "/api/tournament-types/:tournamentTypeId";

export const UPDATE_GAME_GENERATION = "/api/game-generations/:gameGenerationId";
export const UPDATE_ROLE = "/api/roles/:roleId";
export const UPDATE_DEVICE = "/api/devices/:deviceId";
export const UPDATE_TOURNAMENT = "/api/tournaments/:tournamentId";
export const UPDATE_TOURNAMENT_INSCRIPTION =
  "/api/inscriptions/:tournamentInscriptionId";
export const UPDATE_TOURNAMENT_INSCRIPTION_STATUS =
  "/api/inscriptions/:tournamentInscriptionId/status";
export const UPDATE_TOURNAMENT_RULE = "/api/tournament-rules/:tournamentRuleId";
export const UPDATE_TOURNAMENT_SYSTEM =
  "/api/tournament-systems/:tournamentSystemId";
export const UPDATE_TOURNAMENT_TYPE = "/api/tournament-types/:tournamentTypeId";

export const GET_DEVICES = "/api/options/devices";
export const GET_GAMES = "/api/options/games";
export const GET_GAME_GENERATIONS = "/api/options/game-generations";
export const GET_ROLES = "/api/options/roles";
export const GET_TOURNAMENT_FORMATS = "/api/options/tournament-formats";
export const GET_TOURNAMENT_RULES = "/api/options/tournament-rules";
export const GET_TOURNAMENT_SYSTEMS = "/api/options/tournament-systems";
export const GET_TOURNAMENT_TYPES = "/api/options/tournament-types";
