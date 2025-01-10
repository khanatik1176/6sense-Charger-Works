export interface CompleteCompanyList {
    data: CompanyList[]
    count: number
  }
  
  export interface CompanyList {
    _index: string
    _type: string
    _id: string
    _score: any
    _source: Source
    sort: number[]
  }
  
  export interface Source {
    byPhone: string
    website: string
    zip: string
    status: string
    ein: string
    createdAt: string
    zohoCompanyId: string
    isDeleted: boolean
    address: string
    byName: string
    email: string
    country: string
    name: string
    state: string
    city: string
    zohoCompanyErrorMessage: string
    byCreatedAt: string
    fileId: string
    updatedAt: string
    byEmail: string
    zohoCompanyError: boolean
    id: string
    phone: string
    colorCodes?: string[]
    customerTitle?: string
    propertyCount: number
    entityCount: number
    zohoNewComAdded?: boolean
  }
  