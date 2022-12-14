import api from "../../services/api.js";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { StyledForm } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./schema";
import { toast, Toaster } from "react-hot-toast";

const FormRegister = ({ navigate }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema, { setValidationContext: true }),
		defaultValues: "",
	});

	const onSubmitFunction = ({
		name,
		email,
		password,
		bio,
		contact,
		course_module,
	}) => {
		const user = { name, email, password, bio, contact, course_module };
		registerPost(user);
	};

	async function registerPost(user) {
		try {
			const request = await api.post("/users", user);

			const response = await request.data;

			localStorage.setItem("@KenzieHub:userMail", response.email);

			toast.success("Usuário Registrado!", {
				style: {
					border: "solid 2px var(--color-success)",
				},
				iconTheme: {
					primary: "var(--color-success)",
					secondary: "#ffffff",
				},
				duration: 3000,
			});
			setTimeout(() => {
				navigate("/");
			}, 2800);
		} catch (error) {
			toast.error(`${error.response.data.message}`, {
				style: {
					border: "solid 2px var(--color-negative)",
				},
				iconTheme: {
					primary: "var(--color-negative)",
					secondary: "#ffffff",
				},
				duration: 5000,
			});
		}
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmitFunction)} noValidate>
			<div>
				<h2>Crie sua conta</h2>
				<h5>Rápido e grátis, vamos nessa</h5>
			</div>

			<section>
				<label htmlFor="name">Nome</label>
				<input
					type="text"
					placeholder="Digite aqui seu nome"
					defaultValue=""
					{...register("name")}
				/>
				{errors.name?.message && <p>{errors.name.message}</p>}
			</section>

			<section>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					placeholder="Digite aqui seu email"
					defaultValue=""
					{...register("email")}
				/>
				{errors.email?.message && <p>{errors.email.message}</p>}
			</section>

			<section>
				<label htmlFor="password">Senha</label>
				<input
					type="password"
					placeholder="Digite aqui seu senha"
					defaultValue=""
					{...register("password")}
				/>
				{errors.password?.message && <p>{errors.password.message}</p>}
			</section>

			<section>
				<label htmlFor="passwordCheck">Confirmar Senha</label>
				<input
					type="password"
					placeholder="Digite novamente sua senha"
					defaultValue=""
					{...register("passwordCheck")}
				/>
				{errors.passwordCheck?.message && (
					<p>{errors.passwordCheck.message}</p>
				)}
			</section>

			<section>
				<label htmlFor="bio">Bio</label>
				<input
					type="text"
					placeholder="Fale sobre você"
					defaultValue=""
					{...register("bio")}
				/>
				{errors.bio?.message && <p>{errors.bio.message}</p>}
			</section>

			<section>
				<label htmlFor="contact">Contato</label>
				<input
					type="text"
					placeholder="Opção de contato"
					defaultValue=""
					{...register("contact")}
				/>
				{errors.contact?.message && <p>{errors.contact.message}</p>}
			</section>

			<section>
				<label>Selecionar Módulo</label>
				<select {...register("course_module")}>
					<option value="" disabled>
						Selecionar módulo
					</option>
					<option value="Primeiro módulo (Introdução ao Frontend)">
						Primeiro módulo
					</option>
					<option value="Segundo módulo (Frontend Avançado)">
						Segundo módulo
					</option>
					<option value="Terceiro módulo (Introdução ao Backend)">
						Terceiro módulo
					</option>
					<option value="Quarto módulo (Backend Avançado)">
						Quarto módulo
					</option>
				</select>
				{errors.module?.message && <p>{errors.module.message}</p>}
			</section>

			<Button type="submit">Cadastrar</Button>
			<Toaster />
		</StyledForm>
	);
};

export default FormRegister;
