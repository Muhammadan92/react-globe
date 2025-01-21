interface Response<T> {
  data: T;
  error: unknown;
}

export interface IssueDetailsInterface {
  [key: string]: string | number | boolean | null;
  id: number | null;
  assigneeName: string | null;
  availability: boolean | null;
  availabilityText: string | null;
  categoryName: string | null;
  code: string | null;
  dateOpened: string | null;
  dateUpdated: string | null;
  departmentName: string | null;
  description: string | null;
  firstName: string | null;
  formattedDateOpened: string | null;
  formattedDateUpdated: string | null;
  issueRule: string | null;
  issueUpdate: string | null;
  lastName: string | null;
  managementMemo: string | null;
  parVin: string | null;
  phone: string | null;
  resolution: string | null;
  status: boolean | null;
  statusText: string | null;
}

export const emptyIssueDetails: IssueDetailsInterface = {
  id: null,
  assigneeName: null,
  availability: null,
  availabilityText: null,
  categoryName: null,
  code: null,
  dateOpened: null,
  dateUpdated: null,
  departmentName: null,
  description: null,
  firstName: null,
  formattedDateOpened: null,
  formattedDateUpdated: null,
  issueRule: null,
  issueUpdate: null,
  lastName: null,
  managementMemo: null,
  parVin: null,
  phone: null,
  resolution: null,
  status: null,
  statusText: null,
};

class ApiExample {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://localhost:7277/issues';
  }

  async getContacts() {
    return [
      {
        id: 1,
        name: 'Tulio Gonçalves',
      },
      {
        id: 2,
        name: 'Abe Kline',
      },
      {
        id: 3,
        name: 'Quinn Rayner',
      },
      {
        id: 4,
        name: 'Elaine Geiger',
      },
      {
        id: 5,
        name: 'Jessie Carter',
      },
      {
        id: 6,
        name: 'Loren Craig-Mohebali',
      },
      {
        id: 7,
        name: 'Sidney Kauffmann',
      },
    ];
  }

  async getIssues() {
    const response = await fetch(`${this.baseUrl}/GetIssuesJson`, {
      method: 'GET',
      mode: 'cors',
    });
    try {
      return response.json();
    } catch (error) {
      return { response, error };
    }
  }

  async getIssueDetails(id: string): Promise<Response<IssueDetailsInterface>> {
    const response = await fetch(`${this.baseUrl}/GetIssueDetailsJson/${id}`, {
      method: 'GET',
      mode: 'cors',
    });
    try {
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: emptyIssueDetails,
        error,
      };
    }
  }

  async updateIssueDetails(data: IssueDetailsInterface) {
    const response = await fetch(`${this.baseUrl}/UpdateIssueJson`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return { error: response.statusText };
    }
    return { error: null };
  }
}

export default ApiExample;
