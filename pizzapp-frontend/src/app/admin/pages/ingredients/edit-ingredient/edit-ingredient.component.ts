import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.sass']
})
export class EditIngredientComponent implements OnInit {
  id: string
  item: Ingredient = new Ingredient()
  file: File

  constructor(private service: IngredientService, private route: ActivatedRoute, private alert: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.service.findOne(this.id).subscribe(data => {
      this.item = data
    })
  }

  onFileChange(file: File) {
    this.file = file
    const reader  = new FileReader();
    reader.onloadend = () => {
      this.item.image_url = reader.result.toString();
    }
    reader.readAsDataURL(this.file);
  }

  submit() {
    this.alert.showLoading()
    let formData = new FormData()
    if(this.file) formData.append("file", this.file)
    formData.append("name", this.item.name)
    formData.append("type", this.item.type)
    formData.append("description", this.item.description)
    formData.append("price", this.item.price.toString())
    formData.append("zindex", this.item.zindex.toString())

    this.service.update(this.id, formData).subscribe(result => {
      this.alert.success('Elemento actualizado correctamente!')
    }, error => { this.alert.error('Ha ocurrido un error') })
  }
}
