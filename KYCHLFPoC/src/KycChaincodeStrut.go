package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

// Region Chaincode implementation
// https://github.com/devchaud/GlobalKycDatabase/blob/master/KycChaincode.go (STRUT BASED)
type KycChaincode struct {
}

var WorldState = "USER_KYC_DETAILS"

type KycData struct {
	USER_NAME           string    `json:"USER_NAME"`
	USER_ID             string    `json:"USER_ID"`
	KYC_BANK_NAME       string    `json:"KYC_BANK_NAME"`
	KYC_CREATE_DATE     time.Time `json:"KYC_CREATE_DATE"`
	KYC_VALID_TILL_DATE time.Time `json:"KYC_VALID_TILL_DATE"`
	KYC_DOC_BLOB        string    `json:"KYC_DOC_BLOB"`
}

func (t *KycChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	var err error
	// Initialize the chaincode

	var EmptyKYC []KycData
	jsonAsBytes, _ := json.Marshal(EmptyKYC)
	err = stub.PutState(WorldState, jsonAsBytes)
	if err != nil {
		return nil, err
	}

	fmt.Printf("Deployment of KYC is completed\n")
	return nil, nil
}

// Add user KYC data in Blockchain
func (t *KycChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	// Handle different functions
	if function == "InsertKycDetails" {
		// Insert User's KYC data in blockchain
		return t.InsertKycDetails(stub, args)
	} else if function == "UpdateKycDetails" {
		// Update User's KYC data in blockchain
		return t.UpdateKycDetails(stub, args)
	}

	return nil, errors.New("Received unknown function invocation")
}

func (t *KycChaincode) InsertKycDetails(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var KYCDetails []KycData
	var KYCObj KycData

	if len(args) != 4 {
		return nil, errors.New("Incorrect number of arguments. Need 4 arguments")
	}

	// Initialize the chaincode
	KYCObj.USER_NAME = args[0]
	KYCObj.USER_ID = args[1]
	KYCObj.KYC_BANK_NAME = args[2]
	KYCObj.KYC_DOC_BLOB = args[3]
	KYCObj.KYC_CREATE_DATE = time.Now().Local()
	KYCObj.KYC_VALID_TILL_DATE = KYCObj.KYC_CREATE_DATE.AddDate(2, 0, 0)

	jsonAsBytes, err := stub.GetState(WorldState)
	if err != nil {
		return nil, errors.New("Failed to get consumer Transactions")
	}
	json.Unmarshal(jsonAsBytes, &KYCDetails)

	KYCDetails = append(KYCDetails, KYCObj)
	jsonAsBytes1, _ := json.Marshal(KYCDetails)

	err = stub.PutState(WorldState, jsonAsBytes1)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func (t *KycChaincode) UpdateKycDetails(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var KYCDetails []KycData
	var KYCObj KycData
	var UserId string

	UserId = args[1]

	jsonAsBytes, err := stub.GetState(WorldState)
	if err != nil {
		return nil, errors.New("Failed to get Consumer's KYC record.")
	}
	json.Unmarshal(jsonAsBytes, &KYCDetails)

	i := 0
	l := len(KYCDetails)
	for i < l {
		Kyc := KYCDetails[i]
		if Kyc.USER_ID == UserId {
			KYCDetails = append(KYCDetails[:i], KYCDetails[i+1:]...)
			KYCObj.USER_NAME = args[0]
			KYCObj.USER_ID = args[1]
			KYCObj.KYC_BANK_NAME = args[2]
			KYCObj.KYC_DOC_BLOB = args[3]
			KYCObj.KYC_CREATE_DATE = time.Now().Local()
			KYCObj.KYC_VALID_TILL_DATE = KYCObj.KYC_CREATE_DATE.AddDate(2, 0, 0)
			KYCDetails = append(KYCDetails, KYCObj)
			break
		} else {
			i++
		}
	}

	jsonAsBytes1, _ := json.Marshal(KYCDetails)

	err = stub.PutState(WorldState, jsonAsBytes1)
	if err != nil {
		return nil, err
	}
	return nil, nil

}

// Query callback representing the query of a chaincode
func (t *KycChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	var kycId string
	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting customer id for query")
	}

	kycId = args[0]
	//if function == "search" {
	res, err := t.searchKYC(stub, kycId)
	if err != nil {
		return nil, errors.New("Search for the customer KYC failed")
	}
	return res, nil
	//}

	//return nil, nil
}

func (t *KycChaincode) searchKYC(stub shim.ChaincodeStubInterface, kycId string) ([]byte, error) {
	var SearchKYCDetails []KycData
	var SearchKYCDetailsNew []KycData
	var kycFound bool

	kyctxasBytes, err := stub.GetState(WorldState)
	if err != nil {
		return nil, errors.New("Failed to get Transactions")
	}

	json.Unmarshal(kyctxasBytes, &SearchKYCDetails)
	lengths := len(SearchKYCDetails)

	if kycId == "" {
		res, err := json.Marshal(SearchKYCDetails)
		if err != nil {
			return nil, errors.New("Failed to Marshal the required Obj")
		}
		return res, nil
	}

	kycFound = false
	for i := 0; i < lengths; i++ {
		obj := SearchKYCDetails[i]
		if kycId == obj.USER_ID {
			SearchKYCDetailsNew = append(SearchKYCDetailsNew, obj)
			kycFound = true
		}
	}

	if kycFound {
		res, err := json.Marshal(SearchKYCDetailsNew)
		if err != nil {
			return nil, errors.New("Failed to Marshal the required Obj")
		}
		return res, nil
	} else {
		res, err := json.Marshal("No Data found")
		if err != nil {
			return nil, errors.New("Failed to Marshal the required Obj")
		}
		return res, nil
	}

}

func main() {
	err := shim.Start(new(KycChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}