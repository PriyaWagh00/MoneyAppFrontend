import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TService } from '../t.service';
// import { Router } from 'express';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent  {
}