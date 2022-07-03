export interface CreateOrEditTournamentDTO {
  title: string;
  description: string;
  place: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  createdByPerson: {
    id: string | null;
  };
  tournamentType: {
    id: string | null;
  };
  tournamentFormat: {
    id: string | null;
  };
  tournamentPrice: {
    symbol: string | null;
    amount: number | null;
  };
  tournamentPrizes: {
    id?: string;
    title: string;
    description: string;
  }[];
  games: {
    id: string;
  }[];
  devices: {
    id: string;
  }[];
  tournamentSystems: {
    id: string;
  }[];
  tournamentRules: {
    id: string;
  }[];
  tournamentImageFile: null | Blob | string;
  image: {
    id: string | null;
    url: string | null;
  };
}
