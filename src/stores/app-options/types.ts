import { Device } from "@/models/device.model";
import { GameGeneration } from "@/models/game-generation.model";
import { Game } from "@/models/game.model";
import { Role } from "@/models/role.model";
import { TournamentFormat } from "@/models/tournament-format.model";
import { TournamentRule } from "@/models/tournament-rule.model";
import { TournamentSystem } from "@/models/tournament-system.model";
import { TournamentType } from "@/models/tournament-type.model";

export interface AppOptionsStoreState {
  devices: Device[];
  gameGenerations: GameGeneration[];
  games: Game[];
  roles: Role[];
  tournamentFormats: TournamentFormat[];
  tournamentRules: TournamentRule[];
  tournamentSystems: TournamentSystem[];
  tournamentTypes: TournamentType[];
}
