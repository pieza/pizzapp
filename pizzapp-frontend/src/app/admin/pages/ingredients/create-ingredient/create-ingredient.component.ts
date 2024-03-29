import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.sass']
})
export class CreateIngredientComponent implements OnInit {
  item: Ingredient = new Ingredient()
  file: File
  constructor(private service: IngredientService, private alert: AlertService) { }

  ngOnInit(): void {
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

    this.service.create(formData).subscribe(result => {
      this.alert.success('Elemento creado correctamente!')
    }, error => { this.alert.handleError(error) })
  }

}
