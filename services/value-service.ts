import { DBValue, ValueResponse } from "../interfaces/value-interfaces";
import { ResponseError } from "../middleware/errorHandler.middleware";
import ValueModel from "../schemas/value-model";

class ValueService {
  public async createValue(value: string): Promise<ValueResponse> {
    const input = new ValueModel({ value: value });
    await input.save();
    return {
      _id: input._id,
      value,
    };
  }

  public async deleteValue(_id: string): Promise<ValueResponse> {
    const deletedValue: DBValue | null = await ValueModel.findByIdAndDelete(
      _id
    );
    if (deletedValue) {
      return {
        _id,
        value: deletedValue.value,
      };
    } else {
      throw new ResponseError(404, `User not found`);
    }
  }

  public async changeValue(_id: string, value: string): Promise<ValueResponse> {
    const dbValue: any = await ValueModel.findById(_id);
    if (dbValue) {
      dbValue.value = value;
      await dbValue.save();
      return {
        _id: dbValue._id,
        value: dbValue.value,
      };
    } else {
      throw new ResponseError(404, `Value with ${_id} was not found`);
    }
  }

  public async getAllValues(): Promise<ValueResponse[]> {
    const allInputs: any[] = await ValueModel.find();
    const allInputsResponse = allInputs.map((input) => {
      return {
        _id: input._id,
        value: input.value,
      };
    });
    return allInputsResponse;
  }

  public async getOneValue(_id: string): Promise<ValueResponse> {
    const dbValue: DBValue | null = await ValueModel.findById(_id);
    if (dbValue) {
      return {
        _id: dbValue._id,
        value: dbValue.value,
      };
    } else {
      throw new ResponseError(404, `${_id} not found`);
    }
  }
}

const valueService = new ValueService();
export default valueService;
