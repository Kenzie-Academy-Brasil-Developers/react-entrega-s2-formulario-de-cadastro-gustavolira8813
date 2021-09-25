import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button, TextField, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { styled } from "@material-ui/core/styles/";

const InputForm = styled(TextField)({
  marginBottom: "35px",
  maxWidth: "420px",
  backgroundColor: "tranparent",
  width: "340px",
});
const FormRegistration = ({ setName }) => {
  const schema = yup.object().shape({
    name: yup.string().required("campo obrigatório"),
    email: yup.string().email("email inválido").required("campo obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,

        "A senha deve ter pelo menos 8 caracteres. A senha deve conter letras maiúsculas e minúsculas, números, espaços e caracteres especiais."
      )
      .min(8, "senha deve conter ao menos 8 caracteres")
      .required("campo obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "senha não são iguais")
      .required("campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    history.push(`/welcome/${data.name}`);
    setName(data.name);
    // axios
    //   .post("", data)
    //   .then((response) => console.log(response.data))
    //   .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <h2>Formulário de Cadastro</h2>

        <InputForm
          className="inputs"
          error={errors.name && true}
          label="Username"
          // required
          variant="outlined"
          {...register("name")}
          helperText={
            errors.name?.message && <span>{errors.name.message}</span>
          }
        />
        <InputForm
          error={errors.email && true}
          type="email"
          label="Email"
          // required
          variant="outlined"
          {...register("email")}
          helperText={
            errors.email?.message && <span>{errors.name.message}</span>
          }
        />
        <InputForm
          error={errors.password && true}
          label="Senha"
          // required
          variant="outlined"
          type="password"
          {...register("password")}
          helperText={
            errors.password?.message && (
              <ul>
                <li>{errors.password.message.split(".")[0]}</li>
                <li>{errors.password.message.split(".")[1]}</li>
              </ul>
            )
          }
        />

        <InputForm
          error={errors.confirmPassword && true}
          label="Confirma senha"
          // required
          variant="outlined"
          type="password"
          {...register("confirmPassword")}
          helperText={
            errors.confirmPassword?.message && (
              <span>{errors.confirmPassword.message}</span>
            )
          }
        />

        <Button
          className="BTN"
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
        >
          Cadastrar
        </Button>
      </Box>
    </form>
  );
};

export default FormRegistration;
