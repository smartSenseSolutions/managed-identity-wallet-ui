export type EntityType = "Admin" | "Company";

export type EntityDetails = {
  entityName: EntityType;
  entityUUID: string;
  isDefaultEntity: boolean;
  profileCompleted: boolean;
  profileStep: number;
  logo: string;
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  name: string;
  stateId: number;
  stateName: string;
  updatedAt: string;
};

export type invalidDetails = {
  entityName: string;
  ownerName: string;
  ownerEmail: string;
  domainExist: boolean;
};

export type RegisterationState = {
  entities: EntityDetails[];
  status: "init" | "success" | "failure" | "loading";
  remainingRegistration: EntityDetails | null;
  selectedEntity: null | EntityDetails;
  lastSelectedEntity: null | EntityDetails;
  refetchCount: number;
  isValidated: boolean;
  validateApiStatus: "init" | "success" | "failure" | "loading";
  shouldIgnoreSelectedEntity: boolean;
  invalidatedDetails?: invalidDetails;
  refetchJustDetails: number;
  lastActiveStep?: number;
  selectedEducationLevel?: any;
  imageCounter: number;
};

export const initialState: RegisterationState = {
  status: "init",
  entities: [],
  remainingRegistration: null,
  selectedEntity: null,
  refetchCount: 0,
  validateApiStatus: "init",
  isValidated: false,
  refetchJustDetails: 0,
  lastSelectedEntity: null,
  shouldIgnoreSelectedEntity: false,
  imageCounter: 0,
};

type validationPayload =
  | { isValidated: true }
  | { isValidated: false; invalidDetails: invalidDetails };

export type Action =
  | { type: "FETCHING" }
  | { type: "FETCHED_FAILURE"; payload: { error: string } }
  | {
      type: "FETCHED_SUCCESS";
      payload: {
        entities: EntityDetails[];
        lastSelectedEntityUUID?: string;
        shouldKeepSelectedEntity?: boolean;
      };
    }
  | {
      type: "REGISTER_ENTITY";
      payload: {
        entity: EntityDetails;
        lastActiveStep?: number;
        selectedEducationLevel?: any;
      };
    }
  | { type: "REFETCH" }
  | { type: "VALIDATION_FETCHING" }
  | { type: "VALIDATION_FETCHED"; payload: validationPayload }
  | { type: "SELECT_ENTITY"; payload: EntityDetails }
  | { type: "REFETCH_DETAILS" }
  | { type: "SELECT_LAST_SELECTED_ENTITY" }
  | { type: "ADD_ENTITY" }
  | { type: "REFETCH_IMAGE" };

export type Dispatch = (action: Action) => void;

export const RegistrationReducer = (
  state: RegisterationState,
  action: Action
): RegisterationState => {
  switch (action.type) {
    case "FETCHING": {
      return { ...state, status: "loading" };
    }
    case "FETCHED_FAILURE": {
      return { ...state, status: "failure" };
    }
    case "FETCHED_SUCCESS": {
      let remainingRegistration = null;
      let completedRegistration = null;
      for (let i = 0; i < action.payload.entities.length; i++) {
        if (
          action.payload.entities[i].isDefaultEntity === true &&
          action.payload.entities[i].profileCompleted === false
        ) {
          remainingRegistration = action.payload.entities[i];
        }
        if (action.payload.entities[i].profileCompleted === true) {
          completedRegistration = action.payload.entities[i];
        }
      }
      let selectedEntity = null;
      if (action.payload.entities.length && remainingRegistration === null) {
        selectedEntity = action.payload.entities[0];
      } else if (
        remainingRegistration !== null &&
        completedRegistration !== null
      ) {
        selectedEntity = completedRegistration;
        remainingRegistration = null;
      }
      let isSelectedEntityExist = false;
      let updatedEntity = null;
      if (
        state.selectedEntity &&
        action.payload.shouldKeepSelectedEntity !== undefined &&
        action.payload.shouldKeepSelectedEntity === true
      ) {
        for (let i = 0; i < action.payload.entities.length; i++) {
          if (
            action.payload.entities[i].entityUUID ===
            state.selectedEntity.entityUUID
          ) {
            isSelectedEntityExist = true;
            updatedEntity = action.payload.entities[i];
            break;
          }
        }
      }
      if (
        action.payload.lastSelectedEntityUUID &&
        !remainingRegistration &&
        action.payload.entities.length > 1
      ) {
        for (let i = 0; i < action.payload.entities.length; i++) {
          if (
            action.payload.entities[i].entityUUID ===
              action.payload.lastSelectedEntityUUID &&
            action.payload.entities[i].profileCompleted
          ) {
            selectedEntity = action.payload.entities[i];
            break;
          }
          // else if (action.payload.entities[i].entityUUID === action.payload.lastSelectedEntityUUID) {
          //                         remainingRegistration = action.payload.entities[i];
          //                         break;
          //                     }
        }
      }

      return {
        ...state,
        status: "success",
        entities: action.payload.entities,
        remainingRegistration,
        selectedEntity: isSelectedEntityExist ? updatedEntity : selectedEntity,
        lastSelectedEntity: selectedEntity,
      };
    }
    case "REGISTER_ENTITY": {
      return {
        ...state,
        remainingRegistration: action.payload.entity,
        lastActiveStep: action.payload.lastActiveStep,
        selectedEducationLevel: action.payload.selectedEducationLevel,
      };
    }
    case "REFETCH": {
      return {
        ...state,
        lastActiveStep: undefined,
        selectedEducationLevel: undefined,
        refetchCount: state.refetchCount + 1,
      };
    }
    case "VALIDATION_FETCHING": {
      return { ...state, validateApiStatus: "loading" };
    }
    case "VALIDATION_FETCHED": {
      return {
        ...state,
        validateApiStatus: action.payload.isValidated ? "success" : "failure",
        invalidatedDetails:
          action.payload.isValidated === true
            ? undefined
            : action.payload.invalidDetails,
      };
    }
    case "REFETCH_DETAILS": {
      return {
        ...state,
        refetchJustDetails: state.refetchJustDetails + 1,
      };
    }
    case "SELECT_ENTITY": {
      let remainingRegistration = null;
      if (action.payload.profileCompleted === false) {
        remainingRegistration = action.payload;
        return {
          ...state,
          lastSelectedEntity: state.selectedEntity,
          remainingRegistration,
        };
      }
      return {
        ...state,
        lastSelectedEntity: state.selectedEntity,
        selectedEntity: action.payload,
        remainingRegistration,
      };
    }
    case "SELECT_LAST_SELECTED_ENTITY": {
      return {
        ...state,
        selectedEntity: state.lastSelectedEntity,
        remainingRegistration: null,
        lastActiveStep: undefined,
        selectedEducationLevel: undefined,
      };
    }
    case "REFETCH_IMAGE": {
      return {
        ...state,
        imageCounter: state.imageCounter + 1,
      };
    }
    default: {
      return state;
    }
  }
};
