"""create customer language table

Revision ID: 6b069824ef64
Revises: 0b36503a59e0
Create Date: 2023-10-31 17:09:18.710771

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6b069824ef64'
down_revision: Union[str, None] = '0b36503a59e0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'customer_language',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade'),
        sa.Column('language_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['language.id'], ondelete='cascade')
    )


def downgrade() -> None:
    op.drop_table('customer_language')
