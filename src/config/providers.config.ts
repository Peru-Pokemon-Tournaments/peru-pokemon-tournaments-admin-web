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
  ApiTournamentRulesService,
  TournamentRulesService,
} from "@/services/tournament-rules.service";
import {
  ApiTournamentSystemsService,
  TournamentSystemsService,
} from "@/services/tournament-systems.service";
import axios, { AxiosInstance } from "axios";
const httpClient: AxiosInstance = axios.create();

const authService: AuthService = new ApiAuthService(httpClient);
const devicesService: DevicesService = new ApiDevicesService(httpClient);
const gameGenerationsService: GameGenerationsService =
  new ApiGameGenerationsService(httpClient);
const gamesService: GamesService = new ApiGamesService(httpClient);
const peopleService: PeopleService = new ApiPeopleService(httpClient);
const rolesService: RolesService = new ApiRolesService(httpClient);
const tournamentRulesService: TournamentRulesService =
  new ApiTournamentRulesService(httpClient);
const tournamentSystemsService: TournamentSystemsService =
  new ApiTournamentSystemsService(httpClient);

const ServiceProvider = {
  authService,
  devicesService,
  gameGenerationsService,
  gamesService,
  peopleService,
  rolesService,
  tournamentRulesService,
  tournamentSystemsService,
};

export default ServiceProvider;
