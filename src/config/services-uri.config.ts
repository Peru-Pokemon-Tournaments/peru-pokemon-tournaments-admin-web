export const API_DOMAIN =
  process.env.VUE_APP_API_DOMAIN ?? "http://localhost:8000";
export const ADMIN_LOGIN_URI = "/api/admin/login";
export const FETCH_DEVICES = "/api/devices";
export const FETCH_GAME_GENERATIONS = "/api/game-generations";
export const FETCH_GAMES = "/api/games";
export const FETCH_PEOPLE = "/api/people";
export const FETCH_ROLES = "/api/roles";
export const FETCH_TOURNAMENT_RULES = "/api/tournament-rules";
export const FETCH_TOURNAMENT_SYSTEMS = "/api/tournament-systems";
export const FETCH_TOURNAMENT_TYPES = "/api/tournament-types";
export const FETCH_TOURNAMENTS = "/api/tournaments";

export const CREATE_ROLE = "/api/roles";
export const CREATE_DEVICE = "/api/devices";

export const GET_ROLE = "/api/roles/:roleId";
export const GET_DEVICE = "/api/devices/:deviceId";

export const UPDATE_ROLE = "/api/roles/:roleId";
export const UPDATE_DEVICE = "/api/devices/:deviceId";
