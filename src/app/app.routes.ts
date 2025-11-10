import { Routes } from '@angular/router';
import { BairroForm } from './components/bairro-form/bairro-form';
import { BairroList } from './components/bairro-list/bairro-list';
import { CepForm } from './components/cep-form/cep-form';
import { CepList } from './components/cep-list/cep-list';
import { CidadeFormComponent } from './components/cidade-form/cidade-form';
import { CidadeList } from './components/cidade-list/cidade-list';
import { ClienteFormComponent } from './components/cliente-form/cliente-form';
import { ClienteList } from './components/cliente-list/cliente-list';
import { MarcaForm } from './components/marca-form/marca-form';
import { MarcaList } from './components/marca-list/marca-list';
import { ProdutoFormComponent } from './components/produto-form/produto-form';
import { ProdutoList } from './components/produto-list/produto-list';
import { RuaForm } from './components/rua-form/rua-form';
import { RuaList } from './components/rua-list/rua-list';
import { SexoForm } from './components/sexo-form/sexo-form';
import { SexoList } from './components/sexo-list/sexo-list';
import { TipoForm } from './components/tipo-form/tipo-form';
import { TipoList } from './components/tipo-list/tipo-list';
import { UfForm } from './components/uf-form/uf-form';
import { UfList } from './components/uf-list/uf-list';
import { VendaFormComponent } from './components/venda-form/venda-form';
import { VendaList } from './components/venda-list/venda-list';



export const routes: Routes = [ 
  { path: 'sexos', component: SexoList }, 
  { path: 'sexos/novo', component: SexoForm }, 
  { path: 'sexos/editar/:id', component: SexoForm }, 
  { path: '', redirectTo: '/sexos', pathMatch: 'full' }, 
  { path: 'bairros', component: BairroList }, 
  { path: 'bairros/novo', component: BairroForm }, 
  { path: 'bairros/editar/:id', component: BairroForm }, 
  { path: '', redirectTo: '/bairros', pathMatch: 'full' }, 
  { path: 'ruas', component: RuaList }, 
  { path: 'ruas/novo', component: RuaForm }, 
  { path: 'ruas/editar/:id', component: RuaForm }, 
  { path: '', redirectTo: '/ruas', pathMatch: 'full' }, 
  { path: 'ufs', component: UfList }, 
  { path: 'ufs/novo', component: UfForm }, 
  { path: 'ufs/editar/:id', component: UfForm }, 
  { path: '', redirectTo: '/ufs', pathMatch: 'full' }, 
  { path: 'ceps', component: CepList }, 
  { path: 'ceps/novo', component: CepForm }, 
  { path: 'ceps/editar/:id', component: CepForm }, 
  { path: '', redirectTo: '/ceps', pathMatch: 'full' }, 
  { path: 'marcas', component: MarcaList }, 
  { path: 'marcas/novo', component: MarcaForm }, 
  { path: 'marcas/editar/:id', component: MarcaForm }, 
  { path: '', redirectTo: '/marcas', pathMatch: 'full' }, 
  { path: 'tipos', component: TipoList }, 
  { path: 'tipos/novo', component: TipoForm }, 
  { path: 'tipos/editar/:id', component: TipoForm }, 
  { path: '', redirectTo: '/tipos', pathMatch: 'full' },
  { path: 'cidades', component: CidadeList }, 
  { path: 'cidades/novo', component: CidadeFormComponent }, 
  { path: 'cidades/editar/:id', component: CidadeFormComponent },
  { path: '', redirectTo: '/cidades', pathMatch: 'full' },
  { path: 'produtos', component: ProdutoList },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/editar/:id', component: ProdutoFormComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'clientes', component: ClienteList },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },
  { path: 'vendas', component: VendaList },
  { path: 'vendas/novo', component: VendaFormComponent },
  { path: 'vendas/editar/:id', component: VendaFormComponent },


];
