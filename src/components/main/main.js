import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Game from "../game/game";
import { Howl } from "howler";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';

export default function Main({ reactRoot, user }) {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      username: '',
      edad: null // Inicialización para que InputNumber funcione correctamente
    }
  });
  const [theme] = useState(
    new Howl({
      src: ["./audio/title_theme.wav"],
      loop: true,
      volume: 0.3,
    })
  );

  useEffect(() => {
    theme.play();
    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown"].includes(event.code)) {
        event.preventDefault();
      }
    });
  }, [theme]);

  const onSubmit = () => {
    const player = user ? user : undefined;
    theme.pause();
    if (reactRoot) {
      reactRoot.render(<Game player={player} reactRoot={reactRoot} />);
    } else {
      const root = ReactDOM.createRoot(document.getElementById("subRoot"));
      root.render(<Game player={player} reactRoot={root} />);
    }
  };

  const header = () => {
    return user ? (
      <p className="text-header">Hola de Nuevo ! {user.username}!</p>
    ) : (
      <p className="text-header">JAMA-CMAN!</p>
    );
  };

  // Opciones para el select
  const options = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' }
  ];


  const signupInstructions = () => {
    return user ? null : (
      // <></>
      <p className="signup-instructions">
        Completa el formulario para jugar!
      </p>
    );
  };

  return (
    <div className="main" id="main">
      {header()}
      {/* {buttons()} */}
      <br></br>
      <br></br>
      <img
        className="title-gif w-full h-auto"
        src="/jama/jama_start.gif"
        alt="Pac-Man gif"
      />
      {signupInstructions()}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
        <InputText 
          id="names"
          placeholder="Nombres"
          className={`p-inputtext w-full ${errors.names && 'p-invalid'}`} 
          {...register('names', {
            required: 'Campo obligatorio',
          })} 
        />
        {errors.names && (
          <>
            <br/>
            <span className="text-red-500 text-sm mt-1">
              {errors.names.message}
            </span>
          </>
        )}
      </div>
      <div className="flex flex-col">
        <InputText 
          id="lastnames"
          placeholder="Apellidos"
          className={`p-inputtext w-full ${errors.names && 'p-invalid'}`} 
          {...register('lastnames', {
            required: 'Campo obligatorio',
          })} 
        />
        {errors.lastnames && (
          <>
          <br/>
            <span className="text-red-500 text-sm mt-1">
              {errors.lastnames.message}
            </span>
          </>
        )}
      </div>
      {/* Campo de correo */}
      <div className="flex flex-col">
        <InputText 
          id="email"
          placeholder="Correo electrónico"
          className={`p-inputtext w-full ${errors.email && 'p-invalid'}`} 
          {...register('email', {
            required: 'Campo obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Formato de correo inválido'
            }
          })} 
        />
        {errors.email && (
          <>
            <br/>
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          </>
        )}
      </div>

 {/* Dropdown de PrimeReact */}
    <div className="flex flex-col">
        <Controller
          name="option"
          control={control}
          rules={{ required: 'Debe seleccionar una opción' }}
          render={({ field }) => (
            <Dropdown
              options={options}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              placeholder="¿Cúal es tu plato favorito de la Jama"
              className={`w-full ${errors.option && 'p-invalid'}`}
            />
          )}
        />
        {errors.option && (
          <>
            <br/>
          <span className="text-red-500 text-sm mt-1">
            {errors.option.message}
          </span>
          </>
        )}
      </div>

      <Button label="Enviar" icon="pi pi-check" type="submit" className="mt-10" />
    </form>

      <p className="instructions">
        Usa las teclas direccionales para mover a Jama-CMan por el tablero mientras evitas
        a los tiburones lo mejor que puedas. ¡Recoge un potenciador y luego ataca a los
        tiburones! Cómete todas las bolitas del tablero para subir de nivel. Presiona esc para pausar
        y reanudar el juego en cualquier momento. (Para los usuarios de dispositivos móviles y tabletas, aparecerá un D-pad
        debajo del tablero para que puedas mover a Pac-Man)
      </p>
    </div>
  );
}
