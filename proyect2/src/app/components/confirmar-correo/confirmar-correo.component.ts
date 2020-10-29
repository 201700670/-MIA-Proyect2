import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.component.html',
  styleUrls: ['./confirmar-correo.component.css']
})
export class ConfirmarCorreoComponent implements OnInit {

  constructor(private active: ActivatedRoute, private userService: UploadService, private route: Router) { }

  ngOnInit(): void {
    const parm = this.active.snapshot.params;
    var id = parm.id;
    this.userService.confirmarCorreo(id).subscribe((res) => { });
  }
  login() {
    this.route.navigate(["login"]);
  }
}
