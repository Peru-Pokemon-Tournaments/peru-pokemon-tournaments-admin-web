import "pinia";
import { AppOptionsService } from "./services/app-options.service";
import { AuthService } from "./services/auth.service";
import { DevicesService } from "./services/devices.service";
import { GameGenerationsService } from "./services/game-generations.service";
import { GamesService } from "./services/games.service";
import { PeopleService } from "./services/people.service";
import { RolesService } from "./services/roles.service";
import { TournamentRulesService } from "./services/tournament-rules.service";
import { TournamentSystemsService } from "./services/tournament-systems.service";
import { TournamentTypesService } from "./services/tournament-types.service";
import { TournamentsService } from "./services/tournaments.service";

declare module "pinia" {
  export interface PiniaCustomProperties {
    appOptionsService: AppOptionsService;
    authService: AuthService;
    devicesService: DevicesService;
    gameGenerationsService: GameGenerationsService;
    gamesService: GamesService;
    peopleService: PeopleService;
    rolesService: RolesService;
    tournamentRulesService: TournamentRulesService;
    tournamentSystemsService: TournamentSystemsService;
    tournamentTypesService: TournamentTypesService;
    tournamentsService: TournamentsService;
  }
}
