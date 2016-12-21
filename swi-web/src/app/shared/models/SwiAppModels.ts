import { SwiUser, SwiCompany } from './SwiSecurityModels';

export class SwiHeader {
    Id: number;
    Sequence: number;
    Title: string;
    Revision: string;
    Released: boolean;
    Author: SwiUser;
    Expert: SwiUser;
    Approver: SwiUser;
    Company: SwiCompany;
    HSItems: SwiHSItem[];
    Tools: SwiTool[];
    Stages: SwiStage[];
    Tags: SwiTag[];
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
    Id: number;
    Sequence: number;
    Text: string;
    ImageCaption: string;
    Image: any;
    CriticalStep: boolean;
    CarePoint: string;
    Hyperlink: string;
    RelatedSwi: SwiHeader;
    Observations: SwiObservation[];
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