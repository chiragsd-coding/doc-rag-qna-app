import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { QnaModule } from './qna/qna.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    UserModule,
    DocumentModule,
    IngestionModule,
    QnaModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
