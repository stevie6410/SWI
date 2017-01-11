import { SwiUser, SwiCompany } from './SwiSecurityModels';

export class SwiHeader {
    id: number;
    sequence: number;
    title: string;
    revision: string;
    released: boolean;
    author: SwiUser;
    expert: SwiUser;
    approver: SwiUser;
    company: SwiCompany;
    swihsItems: SwiHSItem[];
    swiTools: SwiTool[];
    swiStages: SwiStage[];
    swiTags: SwiTag[];
}

export class SwiHSItem {
    Id: number;
    Name: string;
    Image: any;
    PrintMessage: string;
    Company: SwiCompany;
}

export class SwiTool {
    Id: number;
    Name: string;
    Caption: string;
    Image: any;
}

export class SwiStage {
    id: number;
    sequence: number;
    text: string;
    imageCaption: string;
    image: any;
    criticalStep: boolean;
    carePoint: string;
    hyperlink: string;
    relatedSwi: SwiHeader;
    observations: SwiObservation[];
}

export class SwiObservation {
    Id: number;
    SwiStage: SwiStage;
    Text: string;
    Image: any;
    JobNumber: string;
    CreatedBy: SwiUser;
    CreatedOn: Date;
    ModifiedBy: SwiUser;
    ModifiedOn: Date;
}

export class SwiTag {
    Id: number;
    Name: string;
}