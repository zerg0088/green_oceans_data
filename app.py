import uvicorn 
from fastapi import APIRouter, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles 
from fastapi import FastAPI
import csv


app = FastAPI() 
templates = Jinja2Templates(directory="templates") 
app.mount("/static", StaticFiles(directory="static"), name="static") 

@app.get('/') 
def hello_world(): 
	return {'message':'hello'} 

@app.get("/items/{id}", response_class=HTMLResponse) 
async def read_item(request: Request, id: str): 
	return templates.TemplateResponse("item.html", {"request": request, "id":id}) 

@app.get("/about", response_class=HTMLResponse) 
def about(request: Request): 
	return templates.TemplateResponse("about.html", {"request": request}) 


@app.get("/project", response_class=HTMLResponse) 
def project(request: Request): 
	return templates.TemplateResponse("project.html", {"request": request}) 


@app.get("/contact", response_class=HTMLResponse) 
def contact(request: Request): 
	return templates.TemplateResponse("contact.html", {"request": request}) 

@app.get("/map/{index}", response_class=HTMLResponse) 
def contact(request: Request, index: str): 
    csvPath = 'static/data/csv/total.csv'
    file = open(csvPath, "r",encoding="utf8")
    data = list(csv.reader(file, delimiter=","))
    file.close()
    
    return templates.TemplateResponse("map.html", {"request": request,"list" : data,"index" : index}) 


@app.get("/map", response_class=HTMLResponse) 
def contact(request: Request): 
    csvPath = 'static/data/csv/total.csv'
    file = open(csvPath, "r",encoding="utf8")
    data = list(csv.reader(file, delimiter=","))
    file.close()
    
    return templates.TemplateResponse("map.html", {"request": request,"list" : data}) 


if __name__ == '__main__': uvicorn.run(app=app,host="0.0.0.0",port=8000)

