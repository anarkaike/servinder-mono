FROM php:8.2-fpm

# Argumentos
ARG user=servinder
ARG uid=1000

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Limpar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensões PHP
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    opcache

# Configurar OPcache
RUN docker-php-ext-enable opcache && \
    echo "opcache.memory_consumption=128\n \
    opcache.interned_strings_buffer=8\n \
    opcache.max_accelerated_files=4000\n \
    opcache.revalidate_freq=2\n \
    opcache.fast_shutdown=1\n \
    opcache.enable_cli=1\n" > /usr/local/etc/php/conf.d/opcache-recommended.ini

# Obter Composer mais recente
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar usuário do sistema
RUN groupadd -g $uid $user && \
    useradd -u $uid -g $user -m -s /bin/bash $user && \
    mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar arquivos do projeto
COPY --chown=$user:$user . /var/www/

# Gerar chave da aplicação
RUN php artisan key:generate

# Instalar dependências do Composer
RUN composer install --no-interaction --optimize-autoloader

# Instalar dependências do Node
RUN npm install && npm run build

# Definir permissões corretas
RUN chown -R $user:$user /var/www && \
    chmod -R 755 /var/www/storage && \
    chmod -R 755 /var/www/bootstrap/cache

# Definir usuário padrão
USER $user

# Comando padrão
CMD ["php-fpm"]
