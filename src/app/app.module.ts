import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VideojuegoModule } from './videojuego/videojuego.module';
import { ClienteModule } from './cliente/cliente.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // importar HttpClientModule después BrowserModule.
    // comunicarse con un servidor a través del protocolo HTTP
    HttpClientModule,
    // importar otras dependencias que sean necesario cargar en el componente principal.

    //Modulos propios en orden
    CoreModule,
    ShareModule,

    HomeModule,
    UsuarioModule,
    ClienteModule,
    VideojuegoModule,

    //Va de ultimo gestor de rutas principal
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
