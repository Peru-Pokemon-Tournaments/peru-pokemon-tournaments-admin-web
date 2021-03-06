import {
  AppApiOptionsService,
  AppOptionsService,
} from "@/services/app-options.service";
import { ApiAuthService, AuthService } from "@/services/auth.service";
import { ApiDevicesService, DevicesService } from "@/services/devices.service";
import {
  ApiGameGenerationsService,
  GameGenerationsService,
} from "@/services/game-generations.service";
import { ApiGamesService, GamesService } from "@/services/games.service";
import { ApiPeopleService, PeopleService } from "@/services/people.service";
import { ApiRolesService, RolesService } from "@/services/roles.service";
import {
  ApiTournamentInscriptionsService,
  TournamentInscriptionsService,
} from "@/services/tournament-inscriptions.service";
import {
  ApiTournamentResultsService,
  TournamentResultsService,
} from "@/services/tournament-results.service";
import {
  ApiTournamentRulesService,
  TournamentRulesService,
} from "@/services/tournament-rules.service";
import {
  ApiTournamentSystemsService,
  TournamentSystemsService,
} from "@/services/tournament-systems.service";
import {
  ApiTournamentTypesService,
  TournamentTypesService,
} from "@/services/tournament-types.service";
import {
  ApiTournamentsService,
  TournamentsService,
} from "@/services/tournaments.service";
import axios, { AxiosInstance } from "axios";
const httpClient: AxiosInstance = axios.create();

const appOptionsService: AppOptionsService = new AppApiOptionsService(
  httpClient
);
const authService: AuthService = new ApiAuthService(httpClient);
const devicesService: DevicesService = new ApiDevicesService(httpClient);
const gameGenerationsService: GameGenerationsService =
  new ApiGameGenerationsService(httpClient);
const gamesService: GamesService = new ApiGamesService(httpClient);
const peopleService: PeopleService = new ApiPeopleService(httpClient);
const rolesService: RolesService = new ApiRolesService(httpClient);
const tournamentInscriptionsService: TournamentInscriptionsService =
  new ApiTournamentInscriptionsService(httpClient);
const tournamentResultsService: TournamentResultsService =
  new ApiTournamentResultsService(httpClient);
const tournamentRulesService: TournamentRulesService =
  new ApiTournamentRulesService(httpClient);
const tournamentSystemsService: TournamentSystemsService =
  new ApiTournamentSystemsService(httpClient);
const tournamentTypesService: TournamentTypesService =
  new ApiTournamentTypesService(httpClient);
const tournamentsService: TournamentsService = new ApiTournamentsService(
  httpClient
);

const ServiceProvider = {
  appOptionsService,
  authService,
  devicesService,
  gameGenerationsService,
  gamesService,
  peopleService,
  rolesService,
  tournamentInscriptionsService,
  tournamentResultsService,
  tournamentRulesService,
  tournamentSystemsService,
  tournamentTypesService,
  tournamentsService,
};

export default ServiceProvider;
