import Input from "./Input";
import Button from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { server_calls } from "../api/server";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/slices/store";
import {
  chooseName,
  chooseEmail,
  chooseAddress,
  choosePhone,
} from "../redux/slices/RootSlice";

interface ContactFormData {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

interface ContactFormProps {
  id?: string;
  data?: ContactFormData;
}

const ContactForm = (props: ContactFormProps) => {
  const { register, handleSubmit, reset } = useForm<ContactFormData>({
    defaultValues: props.data,
  });
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (props.id) {
      // Update existing contact
      await server_calls.update(props.id, data);
      console.log(`Updated: ${data} with ID: ${props.id}`);
    } else {
      // Create new contact
      dispatch(chooseName(data.name));
      dispatch(chooseEmail(data.email));
      dispatch(choosePhone(data.phone_number));
      dispatch(chooseAddress(data.address));
      await server_calls.create(store);
      console.log("Created new contact:", data);
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Contact Name</label>
          <Input {...register("name")} name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input {...register("email")} name="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <Input
            {...register("phone_number")}
            name="phone_number"
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <Input
            {...register("address")}
            name="address"
            placeholder="Address"
          />
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;